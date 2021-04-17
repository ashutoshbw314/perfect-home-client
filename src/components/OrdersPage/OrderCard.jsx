import React from "react";

function OrderCard({order}) {
  console.log(order)
  const formatDate = date => {
    const day = date.getDate();
    const year = date.getFullYear();
    const monthName = date.toLocaleString('default', { month: 'long' });
    return `${day} ${monthName} ${year}`; 
  }

  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getDeliveryDate = startDate => {
    const oneDay = 1000 * 60 * 60 * 24;
    const delay = randomInteger(oneDay * 3, oneDay * 5);
    return new Date(startDate.getTime() + delay);
  }

  return (
    <div className='p-4 my-2 border-2 border-indigo-400 rounded-lg shadow-md hover:border-indigo-800 lg:p-2 grid grid-cols-1 lg:grid-cols-4 hover:scale-105 transform transition-all'>
      <div className='mb-3 grid grid-cols-2 lg:mb-0'>
        <img className='object-cover w-full h-40 shadow-md rounded-md' src={order.imageURL} alt={order.name} />
        <div className='flex flex-col justify-between px-3 py-6'>
          <div>
            <h3 className="text-xl font-semibold text-gray-700">{order.name}</h3>
            <h4 className="text-gray-600 ">by <i>{order.artistName}</i></h4>
          </div>
          <div className='flex justify-between w-full text-gray-600'>
            <p>Qty 1</p>
            <p className='font-bold text-gray-800'>${order.price}</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center py-1'>
        <div className='items-center justify-center grid grid-cols-2 lg:block'>
          <span className='pr-2 text-right text-gray-500'>Status</span>
          <h3 className='pl-2 text-xl font-bold text-yellow-500 lg:pl-0'>In Transit</h3>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center py-1'>
        <div className='items-center justify-center grid grid-cols-2 lg:block'>
          <span className='pr-2 text-right text-gray-500'>Order Date</span>
          <h3 className='pl-2 text-xl font-bold text-gray-500 lg:pl-0'>{formatDate(new Date(order.date))}</h3>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center py-1'>
        <div className='items-center justify-center grid grid-cols-2 lg:block'>
          <span className='pr-2 text-right text-gray-500'>Delivery Expected By</span>
          <h3 className='pl-2 text-xl font-bold text-gray-700 lg:pl-0'>{formatDate(getDeliveryDate(new Date(order.date)))}</h3>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;

