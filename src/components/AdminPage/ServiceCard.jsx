import React, {useRef} from "react";
import AsyncButton from '../shared-components/AsyncButton/AsyncButton';

function ServiceCard({service, handleDelete, idx}) {
  const editBtnRef = useRef();
  const delBtnRef = useRef();


  return (
    <div className='flex flex-col items-center p-1 overflow-hidden rounded-lg shadow-lg border-opacity-90 hover:border-indigo-800 transform transition-all bg-opacity-90 bg-gradient-to-tr from-blue-200 via-yellow-300 to-red-300 hover:animate-gradient-xy'>
      <div className='flex flex-col justify-between w-full h-full p-3 bg-white' style={{borderRadius: '5px'}}>
          <div>
            <img className='flex-shrink-0 object-cover w-full h-64' src={service.imageURL} alt={service.title} />
            <h3 className="py-2 text-2xl font-semibold text-center text-gray-800">{service.title}</h3>
            <p>
              {service.description}
            </p>
          </div>
        <div className='mt-3 grid grid-cols-2 gap-2'>
             <AsyncButton
              ref={editBtnRef}
              className='block px-6 py-3 text-sm font-semibold tracking-wider text-white uppercase rounded-lg shadow cursor-pointer transform transition sm:text-base'
               classNameOnActive='bg-green-500 hover:bg-green-600 hover:-translate-y-0.5 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none focus:ring'
              classNameOnDisabled='bg-gray-300 animate-pulse'
            >
              Edit
            </AsyncButton>        
             <AsyncButton
               ref={delBtnRef}
               onClick={() => handleDelete(service._id, idx)}
               className='block px-6 py-3 text-sm font-semibold tracking-wider text-white uppercase rounded-lg shadow cursor-pointer transform transition sm:text-base'
               classNameOnActive='bg-red-500 hover:bg-red-600 hover:-translate-y-0.5 focus:ring-red-500 focus:ring-opacity-50 focus:outline-none focus:ring'
               classNameOnDisabled='bg-gray-300 animate-pulse'
             >
               Delete
            </AsyncButton>        
          </div>
        </div>
    </div>
  );
}

export default ServiceCard;

