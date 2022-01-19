import React, { Component } from 'react';
import './App.css';
import {getOrders, postOrder, deleteOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {orders: []}
  }

  handleAddOrder = (orderData) => {
    return postOrder(orderData)
      .then(response => {
        this.setState({orders: [...this.state.orders, response]})
        return response
      })
      .catch(error => console.log(error))
  }

  handleDeleteOrder = (orderId) => {
    return deleteOrder(orderId)
      .then(response => {
        if (response === 204) {
          console.log('Dog')
        }
      })
  }

  componentDidMount() {
    getOrders()
      .then(data => this.setState({orders: data.orders}))
      .catch(err => console.error('Error fetching:', err));
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm handleAddOrder={this.handleAddOrder}/>
        </header>

        <Orders orders={this.state.orders} handleDeleteOrder={this.handleDeleteOrder}/>
      </main>
    );
  }
}


export default App;
