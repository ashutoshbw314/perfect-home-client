import React, {useState, useEffect} from 'react';
import NavBar from '../shared-components/NavBar/NavBar';
import  {useAuth} from '../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrdersSection from './OrderSection';
import MyOrdersSection from './MyOrdersSection';

function OrdersPage() {
  const tabs = ["Order", "Orders list", "Review"];
  const [tab, setTab] = useState(tabs[0]);
  const auth = useAuth();

  return (
    <div>
      <NavBar wide={true}/>
      <ToastContainer
        position="bottom-left"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <div className='flex lg:grid lg:grid-cols-12'>
        <div className='bg-indigo-900 min-h-screen--44 lg:col-span-3'>
          <div className='sticky pt-4 top-44px space-y-2'>
            <div onClick={() => setTab(tabs[0])} className={`${tab == tabs[0] ? 'bg-indigo-500' : ''} flex px-3 py-2 text-lg text-white cursor-pointer hover:bg-indigo-500`}>
              <svg className='w-6 text-white lg:mx-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
              <span className="hidden lg:block">Order</span>
            </div>
            <div onClick={() => setTab(tabs[1])} className={`${tab == tabs[1] ? 'bg-indigo-500' : ''} flex px-3 py-2 text-lg text-white cursor-pointer hover:bg-indigo-500`}>
              <svg className='w-6 text-white lg:mx-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
              <span className="hidden lg:block">My Orders</span>
            </div>
            <div onClick={() => setTab(tabs[2])} className={`${tab == tabs[2] ? 'bg-indigo-500' : ''} flex px-3 py-2 text-lg text-white cursor-pointer hover:bg-indigo-500`}>
              <svg className='w-6 text-white lg:mx-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
  </svg>
              <span className="hidden lg:block">Review</span>
            </div>
          </div>
        </div>
        <div className='w-full h-full lg:col-span-9'>
          { tab == tabs[0] && <OrdersSection setTab={setTab} tabs={tabs} order={JSON.parse(localStorage.getItem('service'))} /> }
          { tab == tabs[1] && <MyOrdersSection />}
          { tab == tabs[2] && <h1>This is Make admin</h1> }
        </div>
      </div>
    </div>
  )
}

export default OrdersPage;
