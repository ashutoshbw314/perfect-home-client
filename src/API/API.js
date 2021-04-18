const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
import axios from 'axios';

export const pay = (details) => {
  return axios.post(BASE_API_URL + "/charge", details);
}

export const get3Services = () => {
  return fetch(BASE_API_URL + `/3-services`).then(res => res.json())
};

export const get3RandomReviews = () => {
  return fetch(BASE_API_URL + `/3-random-reviews`).then(res => res.json())
};

export const getOrdersByEmail = (email) => {
  return fetch(BASE_API_URL + `/orders?email=${encodeURIComponent(email)}`).then(res => res.json())
};

export const getAllOrders = () => {
  return fetch(BASE_API_URL + `/orders`).then(res => res.json())
};

export const changeOrderStatus = (id, status) => {
  return fetch(BASE_API_URL + `/orders/${id}?status=${status}`, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  })  
};

export const checkAdmin = (email) => {
  return fetch(BASE_API_URL + `/isAdmin?email=${encodeURIComponent(email)}`).then(res => res.json())
};

export const addAdmin = (email) => {
  return fetch(BASE_API_URL + '/admin', {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email})
  })  
};

export const addService = (serviceData) => {
  return fetch(BASE_API_URL + '/service', {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(serviceData)
  })  
};

export const addReview = (data) => {
  return fetch(BASE_API_URL + '/review', {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })  
};

export const getOrders = (uid) => {
  return fetch(BASE_API_URL + `/orders/${uid}`).then(res => res.json())
};

export const placeOrder = (order) => {
  return fetch(BASE_API_URL + '/orders', {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })  
};

export const deleteProduct = (id) => {
  return fetch(`${BASE_API_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })  
};
