import React, {useState, useEffect} from "react";
import {getAllServices} from '../../API/API';
import {useAuth} from '../../hooks/useAuth';
import ServiceCard from './ServiceCard';
import {deleteService} from '../../API/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ManageServicesSection() {
  const [services, setServices] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    const fetchServices = async () => {
      const result = await getAllServices();
      setServices(result);
    }
    fetchServices();
  }, []);

  const removeArrayElt = (a, n) => {
    const newArray = a.slice(0);
    newArray.splice(n, 1);
    return newArray;
  }

  const handleDelete = async (id, idx) => {
    try {
      const res = await deleteService(id);
      const data = await res.json();
      if (!data.error) {
        toast.success("Service deleted successfully!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setServices(removeArrayElt(services, idx));
      } else {
        toast.error(data.error, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch(error) {
      console.log(error.message);
    }
  }


  return (
    <div className='overflow-auto'>
      <ToastContainer
        position="bottom-left"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <h1 className='mx-5 my-3 text-4xl font-bold text-indigo-800'>Manage Services</h1>
      <div className='pb-4 mt-6 mx-7 grid gap-6 lg:grid-cols-2 xl:grid-cols-2'>
      {
        services && services.map((service, idx) => {
          return <ServiceCard handleDelete={handleDelete} idx={idx} key={service._id} service={service} />
        })
      }
      {
        services && services.length == 0 && <p>There is no services yet.</p>
      }
      </div>
    </div>
  );
}

export default ManageServicesSection;


