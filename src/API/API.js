const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const get3Services = () => {
  return fetch(BASE_API_URL + `/3-services`).then(res => res.json())
};

export const getProduct = (id) => {
  return fetch(BASE_API_URL + `/products/${id}`).then(res => res.json())
};

export const checkAdmin = (email) => {
  return fetch(BASE_API_URL + `/isAdmin?email=${encodeURIComponent(email)}`).then(res => res.json())
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
