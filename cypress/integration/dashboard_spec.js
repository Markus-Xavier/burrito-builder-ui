describe('Burrito Builder Dashboard - No Saved Data', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      body: {"orders": []} 
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

  })
})

// cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
//   fixture: 'orderData.json'
// })