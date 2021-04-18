import React from "react";

function OrderCard({order}) {
  const status = order.status;
  const statusStyle = status == 'pending'  ? 'bg-red-400' :
                      status == 'ongoing' ? 'bg-yellow-500':
                                             'bg-green-500';

  const formatDate = date => {
    const day = date.getDate();
    const year = date.getFullYear();
    const monthName = date.toLocaleString('default', { month: 'long' });
    return `${day} ${monthName} ${year}`; 
  }

  return (
    <div className='flex flex-col items-center p-1 overflow-hidden rounded-lg shadow-lg border-opacity-90 hover:border-indigo-800 transform transition-all bg-opacity-90 bg-gradient-to-tr from-blue-200 via-yellow-300 to-red-300 hover:animate-gradient-xy'>
        <div className='w-full h-full p-3 bg-white' style={{borderRadius: '5px'}}>
          <img className='flex-shrink-0 object-cover w-full h-64' src={order.serviceImageURL} alt={order.serviceTitle} />
          <h3 className="py-2 text-2xl font-semibold text-center text-gray-800">{order.serviceTitle}</h3>
          <span className={`absolute origin-left font-bold hover:bg-opacity-80 text-white text-lg transform transition hover:scale-105 px-5 py-2 bg-opacity-50 uppercase rounded-xl top-10 border-2 border-gray-200 -left-3 cursor-default ${statusStyle}`}>{order.status}</span>
          <span className={`absolute origin-left font-bold text-white px-5 py-2 rounded-xl bg-opacity-80 hover:bg-opacity-90 transform hover:scale-105 transition top-24 -left-3 bg-indigo-400 border-2 cursor-default border-gray-200`}>
            Ordered on 
            <span className='pl-1 text-lg'>{formatDate(new Date(order.date))}</span> at 
            <span className='pl-1 text-lg'>{new Date(order.date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
          </span>
          <p>
            {order.serviceDescription}
          </p>
        </div>
      
    </div>
  );
}

export default OrderCard;

