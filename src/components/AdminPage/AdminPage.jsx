import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import NavBar from '../shared-components/NavBar/NavBar';
import  {useAuth} from '../../hooks/useAuth';
import AddService from './AddService';
import OrdersListSection from './OrdersListSection';

function AdminPage() {
  const tabs = ["Order list", "Add Service", "Make Admin", "Manage Services"];
  const [tab, setTab] = useState(tabs[0]);
  const auth = useAuth();

  return (
    !auth.user.isAdmin ? (
      <p className='p-3 my-5 text-lg font-bold text-center text-red-500'>Access is not allowed. You can only enter here if you are an admin. Click <Link className='hover:text-blue-700' to='/'>here</Link> to go to home.</p>
    ) :
    <div className=''>
      <NavBar wide={true}/>
      <div className='flex lg:grid lg:grid-cols-12'>
        <div className='bg-indigo-900 min-h-screen--44 lg:col-span-3'>
          <div className='sticky pt-4 space-y-2 top-44px'>
          <div onClick={() => setTab(tabs[0])} className={`${tab == tabs[0] ? 'bg-indigo-500' : ''} flex px-3 py-2 text-lg text-white cursor-pointer hover:bg-indigo-500`}>
            <svg className='w-6 text-white lg:mx-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
</svg>
            <span className="hidden lg:block">Order list</span>
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
          <div onClick={() => setTab(tabs[3])} className={`${tab == tabs[3] ? 'bg-indigo-500' : ''} flex px-3 py-2 text-lg text-white cursor-pointer hover:bg-indigo-500`}>
            <svg className='w-6 text-white lg:mx-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
</svg>
            <span className="hidden lg:block">Manage Services</span>
          </div>
          </div>
        </div>
        <div className='w-full px-3 lg:col-span-9'>
          { tab == tabs[0] && <OrdersListSection /> }
          { tab == tabs[1] && <AddService />}
          { tab == tabs[2] && <h1>This is Make admin</h1> }
          { tab == tabs[3] && <h1>Mangage Services</h1> }
        </div>
      </div>
    </div>
  )
}

export default AdminPage;
