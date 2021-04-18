import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import NavBar from "../shared-components/NavBar/NavBar";
import AsyncButton from "../shared-components/AsyncButton/AsyncButton";
import {getAllServices} from '../../API/API';
import ServiceCard from './ServiceCard';

function ServicesPage() {
  const history = useHistory();
  const [services, setServices] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      const result = await getAllServices();
      setServices(result);
    }
    fetchServices();

  }, []);

  return (
    <div>
      <NavBar />
      <div className='flex flex-col items-center justify-center py-16 min-h-screen--44'>
        <h2 className='mb-5 text-3xl font-bold text-center text-gray-700'>All available Services</h2>
        <div className='max-w-5xl mx-8 mt-9 grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
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

export default ServicesPage;

