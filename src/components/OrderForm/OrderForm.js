import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: ['steak']
    };
  }

  handleIngredientChange = (event) => {
    event.preventDefault();
    const allIngredients = this.state.ingredients;
    const newIngredient = event.target.name;

    if (!allIngredients.includes(newIngredient)) {
      this.setState({ingredients: [...allIngredients, newIngredient]})
    }
  }


  handleSubmit = event => {
    event.preventDefault();
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={event => this.handleIngredientChange(event)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={event => this.handleNameChange(event)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={event => this.handleSubmit(event)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
