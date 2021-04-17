import React, {useState, useEffect} from 'react';
import NavBar from '../shared-components/NavBar/NavBar';
import OrdersSection from './OrderSection';
import  {useAuth} from '../../hooks/useAuth';

function OrdersPage() {
  const tabs = ["Order", "Orders list", "Review"];
  const [tab, setTab] = useState(tabs[0]);
  const auth = useAuth();

  return (
    auth.user.isAdmin ? (
      <></>
    ) :
    <div className='h-screen '>
      <NavBar wide={true}/>
      <div className='flex lg:grid lg:grid-cols-12'>
        <div className='pt-4 bg-indigo-900 space-y-2 lg:col-span-3 h-screen-le-40 lg:h-screen-le-44'>
          <div onClick={() => setTab(tabs[0])} className={`${tab == tabs[0] ? 'bg-indigo-500' : ''} flex px-3 py-2 text-lg text-white cursor-pointer hover:bg-indigo-500`}>
            <svg className='w-6 text-white lg:mx-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
</svg>
            <span className="hidden lg:block">Order</span>
          </div>
          <div onClick={() => setTab(tabs[1])} className={`${tab == tabs[1] ? 'bg-indigo-500' : ''} flex px-3 py-2 text-lg text-white cursor-pointer hover:bg-indigo-500`}>
            <svg className='w-6 text-white lg:mx-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
</svg>
            <span className="hidden lg:block">Add Service</span>
          </div>
          <div onClick={() => setTab(tabs[2])} className={`${tab == tabs[2] ? 'bg-indigo-500' : ''} flex px-3 py-2 text-lg text-white cursor-pointer hover:bg-indigo-500`}>
            <svg className='w-6 text-white lg:mx-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
</svg>
            <span className="hidden lg:block">Make Admin</span>
          </div>
        </div>
        <div className='w-full px-3 lg:col-span-9'>
          { tab == tabs[0] && <OrdersSection /> }
          { tab == tabs[1] && <h1>hbla</h1>}
          { tab == tabs[2] && <h1>This is Make admin</h1> }
        </div>
      </div>
    </div>
  )
}

export default OrdersPage;
