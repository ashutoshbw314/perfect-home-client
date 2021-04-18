import React from "react";

function FooterSection() {

  return (
    <div className='w-full py-8 bg-gray-800 text-gray-50'>
      <div className='px-10 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-40 xl:gap-52 grid'>
        <div>
          <ul className=''>
            <li>
              <a href="#">The Perfect Home Guarantee</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
          <ul className='mt-4 font-bold'>
            <li>
              <a href="#">Be a professional</a>
            </li>
            <li>
              <a href="#">Retail Partnership</a>
            </li>
            <li>
              <a href="#">Scholarship</a>
            </li>
          </ul>
        </div>
        <div className='hidden md:block'>
          <ul className=''>
            <li>
              <a href="#" className='font-bold uppercase'>Locations</a>
            </li>
            <li>
              <a href="#">Bangladesh</a>
            </li>
            <li>
              <a href="#">India</a>
            </li>
            <li>
              <a href="#">London</a>
            </li>
            <li>
              <a href="#">Paris</a>
            </li>
          </ul>
        </div>
        <div className='hidden lg:block'>
          <ul className=''>
            <li>
              <a href="#" className='font-bold uppercase'>Popular Services</a>
            </li>
            <li>
              <a href="#">Cleaning</a>
            </li>
            <li>
              <a href="#">Plumbing</a>
            </li>
            <li>
              <a href="#">Painting</a>
            </li>
            <li>
              <a href="#">See all services</a>
            </li>
          </ul>
        </div>
      </div>
      <hr className='mx-8 my-4 mt-10 border-1 border-gray-50' />
      <div className='flex flex-col justify-between mx-10 md:flex-row'>
        <div>
          <ul className='flex flex-wrap justify-center space-x-2 '>
            <li><a href='#'>Contact</a></li>
            <li><a href='#'>Privacy</a></li>
            <li><a href='#'>Do not Sell</a></li>
            <li><a href='#'>Terms</a></li>
            <li><a href='#'>Privacy</a></li>
          </ul>
        </div>

        <div>
          <p className='mt-5 font-bold text-center text-white md:mt-0'>All right reserved by Perfect Home 2021</p>
        </div>
      </div>
    </div>
  );
}

export default FooterSection;


