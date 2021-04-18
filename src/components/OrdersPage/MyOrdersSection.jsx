import React, {useState, useEffect} from "react";
import {getOrdersByEmail} from '../../API/API';
import {useAuth} from '../../hooks/useAuth';
import OrderCard from './OrderCard';

function MyOrders() {
  const [orders, setOrders] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    const fetchMyOrders = async () => {
      const result = await getOrdersByEmail(auth.user.email);
      setOrders(result);
    }
    fetchMyOrders();
  }, []);

  return (
    <div className='overflow-auto'>
      <h1 className='mx-5 my-3 text-4xl font-bold text-indigo-800'>My Orders</h1>
      <div className='pb-4 mt-6 mx-7 grid gap-6 lg:grid-cols-2 xl:grid-cols-2'>
      {
        orders && orders.map(order => {
          return <OrderCard key={order._id} order={order} />
        })
      }
      {
        orders && orders.length == 0 && <p>You have no orders yet.</p>
      }
      </div>
    </div>
  );
}

export default MyOrders;


