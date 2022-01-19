import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error: ''
    };
  }

  displayError () {
    if (this.state.error) {
      return (<p>{this.state.error}</p>)
    }
  }

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
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
    if (this.state.name && this.state.ingredients.length) {
      this.props.handleAddOrder({name: this.state.name, ingredients: this.state.ingredients})
        .then(response => {
          if (response) {
            this.clearInputs();
          } else {
            this.setState({error: 'Could not post order'})
          }
        })
    }
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
        {this.displayError()}
      </form>
    )
  }
}

export default OrderForm;
