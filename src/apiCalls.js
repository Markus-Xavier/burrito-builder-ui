const baseURL = 'http://localhost:3001'

export const getOrders = () => {
  return fetch(`${baseURL}/api/v1/orders`)
      .then(response => response.json())
}

export const postOrder = (orderData) => {
  return fetch(`${baseURL}/api/v1/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  })
  .then(response => response.json())
}

export const deleteOrder = (orderId) => {
  return fetch(`${baseURL}/api/v1/order/${orderId}`, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.status)
}