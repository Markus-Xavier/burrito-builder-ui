describe('Burrito Builder Dashboard', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      body: {"orders": []} 
    })

    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', (req) => {
      return {body: {"id": 1, ...req.body}}
    })
  })

  it('As a user upon site load I see no orders', () => {
    cy.visit('http://localhost:3000');
    cy.contains('No orders yet!')
      .should('exist');
  });

  it('As a user if I try to submit the form with no inputs it should tell me to add name and ingredients', () => {
    cy.contains('Submit Order')
      .click()

    cy.contains('Please add a name and ingredients')
      .should('exist')
  })

  it('As a user I can type my name into the input field', () => {
    cy.get('input[name="name"]')
      .type('Dog Boy')
      .should('have.value', 'Dog Boy')
  })

  it('As a user I can select a button ingredient and have it show on the order', () => {
    cy.get('button[name="steak"]')
      .click()
    
    cy.get('button[name="lettuce"]')
      .click()

    cy.contains('steak, lettuce')
      .should('exist')
  })

  it('As a user I can submit my form data and have it show as an order on the page', () => {
    cy.contains('Submit Order')
      .click()

    cy.get('div[class="order"]')
      .should('exist')
      .contains('Dog Boy')

    cy.get('div[class="order"]')
      .children('ul')
        .children('li')
        .should('have.length', 2)
  })

  it('As a user when I refresh the page my order should persist', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      body: {"orders": [{"id": 1, "name": "Dog Boy", "ingredients": ["steak", "lettuce"]}]} 
    })
    cy.reload()

    cy.get('div[class="order"]')
      .should('exist')
      .contains('Dog Boy')

    cy.get('div[class="order"]')
      .children('ul')
        .children('li')
        .should('have.length', 2)
  })
})

// cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
//   fixture: 'orderData.json'
// })