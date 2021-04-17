import React, {useState, useEffect} from 'react';
import {useAuth} from '../../hooks/useAuth';
import {loadStripe} from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe("pk_test_51Ie2CCBegGKHxRdAJ2JrkDSJbX5JDARLqQMi6q8DGH9qy5LQK1H3DECAoFCVZ4c2EmJMrUoi1HnCplWCyVspxvFK00z2wikL8k");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if (!error) {
      const {id} = paymentMethod;

      try {
        const { data } = await axios.post(import.meta.env.VITE_BASE_API_URL + "/charge", {id, amount: 9000});
        console.log('data from backend: ', data);
      } catch(error) {
        console.log(error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Price: $90</p>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  )
}

function OrdersSection({order}) {
  const auth = useAuth();

  return (
    <Elements stripe={stripePromise}>
      <h1 className='my-3 text-4xl font-bold text-indigo-800'>Order</h1>
      <CheckoutForm />

    </Elements>
  )
}

export default OrdersSection;

