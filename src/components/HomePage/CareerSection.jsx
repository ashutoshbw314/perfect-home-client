import React from "react";

function CareerSection() {

  return (
    <div className='bg-gray-100'>
      <div className='items-center justify-center max-w-5xl px-5 py-16 mx-auto min-h-screen--44 grid lg:grid-cols-2'>
        <div className=''>
          <h2 className='my-3 text-5xl font-bold text-center text-gray-700'>Are you a Perfect Home Pro?</h2>
          <p className='text-lg text-gray-700'>
            From cleaners to smart home installers, Perfect Home is always looking for service professionals who are experts in their trade and provide great service to their customers. The best home service professionals use <b>Perfect Home</b> for the great pay and flexible scheduling.
          </p>
        </div>
        <div className='flex justify-center ml-10'>
          <img style={{height: '600px'}} src="/img/pro.jpg" alt="career" />
        </div>
      </div>
    </div>
  );
}

export default CareerSection;
