import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm.jsx';

const stripePromise = loadStripe("pk_test_51Ie2CCBegGKHxRdAJ2JrkDSJbX5JDARLqQMi6q8DGH9qy5LQK1H3DECAoFCVZ4c2EmJMrUoi1HnCplWCyVspxvFK00z2wikL8k");

function OrdersSection({order, setTab, tabs}) {
  return (
    <div className='px-4 pb-4 overflow-auto'>
      <Elements stripe={stripePromise}>
        <h1 className='my-3 text-4xl font-bold text-indigo-800'>Order</h1>
        <CheckoutForm order={order} setTab={setTab} tabs={tabs} />

      </Elements>
    </div>
  )
}

export default OrdersSection;

