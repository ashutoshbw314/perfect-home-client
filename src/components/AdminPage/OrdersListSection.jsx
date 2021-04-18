import React, {useState, useEffect, useRef} from 'react';
import {getAllOrders} from '../../API/API';
import SelectWrapper from './SelectWrapper';


function OrderListSection() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const fetchMyOrders = async () => {
      const result = await getAllOrders();
      setOrders(result);
    }
    fetchMyOrders();
  }, []);

  const handleChange = (event) => {
    console.log(event.target.value)
  }

  return (
    <div className='my-4 overflow-hidden rounded-lg shadow-lg'>
      <div className='overflow-auto w-screen-le-88 lg:w-full'>
        {
          orders &&
          <table className='w-full bg-white shadow-lg'>
            <thead className='p-1 bg-gray-700'>
              <tr className='text-gray-600'>
                <th className='px-8 py-2 text-white'>Name</th>
                <th className='px-8 py-2 text-white'>Email</th>
                <th className='px-8 py-2 text-white'>Service</th>
                <th style={{width: '150px'}} className='py-2 text-white '>Paid with</th>
                <th className='px-8 py-2 text-white'>Status</th>
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              {
                orders && orders.map(order => {
                  return (
                    <tr key={order._id} className='hover:bg-red-200 hover:bg-opacity-30'>
                      <td className='px-8 py-2'>{order.username}</td>
                      <td className='px-8 py-2'>{order.email}</td>
                      <td className='px-8 py-2'>{order.serviceTitle}</td>
                      <td className='px-8 py-2'>Credit Card</td>
                      <td className='px-8 py-2'>
                        <SelectWrapper status={order.status} id={order._id} />
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        }
      </div>
    </div>
  )
}

export default OrderListSection;

