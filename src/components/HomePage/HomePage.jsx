import React, {useState, useEffect} from "react";
import NavBar from "../shared-components/NavBar/NavBar";
import AsyncButton from "../shared-components/AsyncButton/AsyncButton";
import {get3Services} from '../../API/API';
import ServiceCard from './ServiceCard';

function HomePage() {

  const [services, setServices] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      const result = await get3Services();
      setServices(result);
    }
    fetchServices();
  }, []);
  console.log(services);

  return (
    <div>
      <NavBar />
      <div className='relative'>
        <img className='object-cover w-full h-96' src="/img/top-banner.jpg" />
        <div className="absolute top-0 flex items-center w-full h-full">
          <div className='flex flex-col items-center justify-center w-full max-w-5xl p-4 mx-auto lg:block'>
            <h1 style={{ textShadow: '4px 4px 0px rgba(0, 98, 255, 0.68)' }} className='p-2 text-5xl font-bold mb-7 text-gray-50'>Plumbing. Painting.<br /> Anything.</h1>
            <AsyncButton className='lg:self-start block py-3 px-5 rounded-full transform font-bold transition bg-indigo-500 hover:bg-indigo-600 hover:-translate-y-0.5 focus:ring-purple-500 focus:ring-opacity-20 focus:outline-none focus:ring tracking-wider text-white shadow cursor-pointer bg-gradient-to-tr from-red-300 to-indigo-400 animate-gradient-xy active:to-indigo-800'>Order a service</AsyncButton>
          </div>
        </div>
      </div>
        
      <div className='max-w-5xl mx-auto '>
        <h2 className='my-3 text-lg font-bold text-center text-gray-600'>Services</h2>
        <div className='mx-8 mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
        {
          services && services.map(service => {
            return <ServiceCard key={service._id} data={service} />
          })
        }
        </div>
      </div>
    </div>
  );
}

export default HomePage;
