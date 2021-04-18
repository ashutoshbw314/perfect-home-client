import React from "react";
import Tilt from 'react-parallax-tilt';
import ReactStars from 'react-rating-stars-component';

function ReviewCard({data}) {

  return (
    <Tilt scale={1.03}  tiltMaxAngleX={10} tiltMaxAngleY={10}>
      <figure className="p-8 shadow-md hover:shadow-lg rounded-xl ">
      <img className="object-cover w-24 h-24 mx-auto rounded-full lg:w-28 lg:h-28" src={data.imageURL} alt=""/>
      <div className="pt-2 text-center space-y-1">
        <div className='flex justify-center'>
          <ReactStars
            count={5}
            size={24}
            edit={false}
            value={data.rating}
            activeColor="#ffd700"
          />
        </div>
        <blockquote>
          <p className="text-lg font-semibold">
            {data.description}
          </p>
        </blockquote>
        <figcaption className="font-medium">
          <div className="text-cyan-600">
            {data.name}
          </div>
          <div className="text-gray-500">
            {data.company}
          </div>
        </figcaption>
      </div>
    </figure>
    </Tilt>
  );
}

export default ReviewCard;

