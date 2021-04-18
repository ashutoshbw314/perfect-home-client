import React from "react";

function ShopSection() {

  return (
    <div className='relative bg-gray-100'>
      <div style={{backgroundImage: 'url("/img/shop.jpg")', objectFit: 'cover', backgroundSize: '100% 100%'}} className='flex items-center justify-center object-cover text-gray-800 bg-no-repeat min-h-screen--44'>
        <div className='max-w-5xl mx-auto'>
          <h1 className='text-5xl font-bold text-gray-800 bg-white bg-opacity-60'>Shop for your Home with Perfect Home</h1>
          <p className='flex justify-center max-w-md p-2 mt-2 text-lg font-bold bg-white bg-opacity-60'>Shop furniture, electronics, appliances, and more. Everything comes with expert installation by Perfect Home.</p>
          <button className='lg:self-start block py-3 px-5 rounded-full transform font-bold transition mt-2 bg-indigo-500 hover:bg-indigo-600 hover:-translate-y-0.5 focus:ring-purple-500 focus:ring-opacity-20 focus:outline-none focus:ring tracking-wider text-white shadow cursor-pointer bg-gradient-to-tr from-red-300 to-indigo-400 animate-gradient-xy active:to-indigo-800'>Shop All home products</button>
        </div>
      </div>
    </div>
  );
}

export default ShopSection;



