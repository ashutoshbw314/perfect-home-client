import React, {useState, useEffect, useRef} from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {addReview} from '../../API/API';
import AsyncButton from '../shared-components/AsyncButton/AsyncButton'
import ReactStars from "react-rating-stars-component";

function ReviewSection() {
  const auth = useAuth();
  const [fileError, setFileError] = useState("");
  const [fileName, setFileName] = useState("");
  const [rating, setRating] = useState(0);
  const schema = yup.object().shape({
    name: yup.
      string().
      trim().
      required('Service title is a required field'),
    description: yup.
      string().
      trim().
      required("Description is a required field"),
    rating: yup.
      number()
  });

  const fileRef = useRef(null);
  const {register, handleSubmit, errors} = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    if (fileRef.current.files.length == 0) {
      setFileError("Please provide a photo for public display with your review.")
    } else {
      setFileError("")
      const imageData = new FormData();
      imageData.set("key", "5faa7f167ad100e10e4218fa2160a9d4");
      imageData.append("image", fileRef.current.files[0]);

      submitBtnRef.current.disable();
      axios.post('https://api.imgbb.com/1/upload', imageData)
      .then(function (response) {
        data.imageURL = response.data.data.display_url;
        data.rating = rating;
        addReview(data).then(res => {
          toast.success("Your review submitted successfully!", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }).catch(err => {
          toast.error(err.message, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
        submitBtnRef.current.activate();
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  };

  const submitBtnRef = useRef();
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className='px-4 pb-4'>
      <ToastContainer
        position="bottom-left"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <h1 className='my-3 text-4xl font-bold text-indigo-800'>Want to give a review?</h1>
      <form 
        className='space-y-3'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='p-5 rounded-lg shadow-md bg-card space-y-3 lg:space-y-0'>
          <div className='space-y-3 lg:space-y-0 lg:mb-4 lg:grid lg:grid-cols-2 lg:gap-4'>
            <label className='block'>
              <span className='font-bold text-gray-800 text-md'>Name</span>
              <input 
                className=''
                name="name"
                ref={register}
                type="text"
                placeholder="Enter your name"
              />
              {errors.name && <p className='px-2 text-sm text-red-500'>{errors.name.message}</p>}
            </label>
            <label className='block'>
              <span className='font-bold text-gray-800 text-md'>Company name, designation <span className='text-gray-400'>(Optional)</span></span>
              <input 
                className=''
                name="company"
                ref={register}
                type="text"
                placeholder="Enter the name of your company and your designation"
              />
            </label>
          </div>
          <div className='pb-4'>
            <label className='block'>
              <span className='font-bold text-gray-800 text-md'>Description</span>
              <textarea 
                className=''
                name="description"
                ref={register}
                type="text"
                placeholder="Enter description"
              >
              </textarea>
              {errors.description && <p className='px-2 text-sm text-red-500'>{errors.description.message}</p>}
            </label>
          </div>
          <div className=''>
            <label className='block'>
              <span className='block pb-1 font-bold text-gray-800 text-md'>Profile photo</span>
              <div className='flex items-center'>
                <div className='w-48'>
                  <p className='flex block p-3 rounded-lg transform transition bg-indigo-300 hover:bg-indigo-200 hover:-translate-y-0.5 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 tracking-wider shadow cursor-pointer w-full'>
                    <svg className='w-6 mr-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span>Upload photo</span>
                  </p>
                  <input 
                    className=''
                    name="photoFile"
                    type="file"
                    ref={fileRef}
                    style={{opacity: '0', width: '0.1px', height: '0.1px', position: 'absolute'}}
                    onChange={() => setFileName(fileRef.current.files[0].name)}
                  />
                </div>
                <div> 
                  {fileError && <p className='px-2 text-sm text-red-500'>{fileError}</p>}
                  {fileName && <p className='px-2 text-md'>{fileName}</p>}
                </div>
              </div>
            </label>
          </div>
          <div className='' style={{marginTop: '14px'}}>
            <span className='font-bold text-gray-800 text-md'>Give a rating: </span>
            <ReactStars
              name="rating"
              count={5}
              onChange={ratingChanged}
              size={24}
              value={0}
              activeColor="#ffd700"
            />
          </div>
        </div>
        <div className='flex flex-row-reverse'>
          <AsyncButton
            ref={submitBtnRef}
            className='block px-6 py-3 text-sm font-semibold tracking-wider text-white uppercase rounded-lg shadow cursor-pointer transform transition sm:text-base'
            classNameOnActive='bg-indigo-500 hover:bg-indigo-600 hover:-translate-y-0.5 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2'
            classNameOnDisabled='bg-gray-500 animate-pulse'
            type='submit'
            >Submit</AsyncButton>
        </div>
      </form>
    </div>
  )
}

export default ReviewSection;
