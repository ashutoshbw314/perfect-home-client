import React, {useRef} from 'react';
import {CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {useAuth} from '../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AsyncButton from '../shared-components/AsyncButton/AsyncButton';
import {pay} from '../../API/API';


const CheckoutForm = ({order, setTab, tabs}) => {
  const stripe = useStripe();
  const elements = useElements();
  const auth = useAuth();
  const payBtnRef = useRef();

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#fff",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "18px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#fce883"
        },
        "::placeholder": {
          color: "#87bbfd"
        }
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee"
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    payBtnRef.current.disable();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if (!error) {
      const {id} = paymentMethod;

      try {
        const { data } = await pay({
          payment_id: id,
          username: auth.user.displayName,
          email: auth.user.email,
          service_id: order._id,
          serviceAmount: order.price * 100,
          serviceTitle: order.title,
          serviceDescription: order.description,
          serviceImageURL: order.imageURL,
        });
        toast.success(data.paymentMessage, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.clear();
        payBtnRef.current.activate();
        setTab(tabs[1]);
      } catch(error) {
        toast.error(error.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        payBtnRef.current.activate();
      }
    } else {
      toast.error(error.message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      payBtnRef.current.activate();
    }
    //payBtnRef.current.activate();
  }

  return (
    order ?
      <form className='p-3 bg-white rounded-lg shadow-md' onSubmit={handleSubmit}>
      <ToastContainer
        position="bottom-left"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <label className='flex items-center'>
        <span className='w-16'>Name: </span> 
        <input className='inline max-w-md' type='text' disabled={true} value={auth.user.displayName}/>
      </label>
      <label className='flex items-center'>
        <span className='w-16'>Email: </span> 
        <input className='inline max-w-md' type='text' disabled={true} value={auth.user.email}/>
      </label>
      <label className='flex items-center'>
        <span className='w-16'>Service: </span> 
        <input className='inline max-w-md' type='text' disabled={true} value={order.title}/>
      </label>
      
      <h2 className='my-3 text-lg font-bold text-gray-800 border-b-2 border-gray-800'>Pay with credit card</h2>
      <p>Your service charge will be <b>${order.price}</b></p>
      <div className='flex items-center my-2'>
        <span className='mr-3'>Enter your card detail:</span> <CardElement options={CARD_OPTIONS} className='flex-grow p-3 bg-gray-700 rounded-lg '/>
      </div>
      <AsyncButton
        ref={payBtnRef}
        type="submit"
        className='block px-5 py-3 text-sm font-semibold tracking-wider text-white uppercase rounded-lg shadow cursor-pointer transform transition'
        classNameOnActive='bg-blue-500 hover:bg-blue-600 hover:-translate-y-0.5 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none focus:ring'
        classNameOnDisabled='bg-gray-500 animate-pulse'
      >
        Pay ${order.price}
      </AsyncButton>
    </form> :
    <p>
      You have not selected a service. Go to services page to choose one.
    </p>
  )
}

export default CheckoutForm;
