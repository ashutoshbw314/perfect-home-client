import React from "react";
import {Link} from "react-router-dom";
import Tilt from 'react-parallax-tilt';

function ServiceCard({data}) {
  return (
    <Tilt scale={1.03}  tiltMaxAngleX={10} tiltMaxAngleY={10}>
      <div className='flex flex-col items-center p-1 overflow-hidden rounded-lg shadow-lg border-opacity-90 hover:border-indigo-800 transform transition-all bg-opacity-90 bg-gradient-to-tr from-blue-200 via-yellow-300 to-red-300 hover:animate-gradient-xy'>
        <div className='w-full p-3 bg-white' style={{borderRadius: '5px'}}>
          <img className='flex-shrink-0 object-cover w-full h-64 ' src={data.imageURL} alt={data.name} />
          <div className='self-start py-1 mb-3'>
            <h3 className="text-lg font-semibold text-gray-800">{data.title}</h3>
          </div>
          <div className='flex justify-center w-full'>
            <Link to={`/checkout/${data._id}`}>
              <button className='block px-3 py-2 rounded-lg transform transition bg-blue-500 hover:bg-blue-600 hover:-translate-y-0.5 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 uppercase tracking-wider font-semibold text-sm text-white shadow  cursor-pointer '>Order Now</button>
            </Link>
          </div>
        </div>
      </div>
    </Tilt>
  );
}

export default ServiceCard;

