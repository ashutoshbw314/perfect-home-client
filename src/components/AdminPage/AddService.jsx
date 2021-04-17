import React, {useState, useEffect, useRef} from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {addService} from '../../API/API';

function AddService() {
  const auth = useAuth();
  const [fileError, setFileError] = useState("");
  const [fileName, setFileName] = useState("");
  const schema = yup.object().shape({
    serviceTitle: yup.
      string().
      trim().
      required('Service title is a required field'),
    description: yup.
      string().
      trim().
      required("Description is a required field"),
    price: yup.
      number().
      typeError('Price must be a number').
      required("Please provide a price.").
      min(5, "Too little").
      max(5000, 'Very costly!'),
  });

  const fileRef = useRef(null);
  const {register, handleSubmit, errors} = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    if (fileRef.current.files.length == 0) {
      setFileError("Please provide a photo of your art work.")
    } else {
      setFileError("")
      const imageData = new FormData();
      imageData.set("key", "5faa7f167ad100e10e4218fa2160a9d4");
      imageData.append("image", fileRef.current.files[0]);

      axios.post('https://api.imgbb.com/1/upload', imageData)
      .then(function (response) {
        data.imgURL = response.data.data.display_url;
        data.uid = auth.user.uid;
        addService(data).then(res => {
          toast.info("Service saved successfully!", {
            position: "bottom-left",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }).catch(err => {
          toast.error(err.message, {
            position: "bottom-left",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  };

  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <h1 className='my-3 text-4xl font-bold text-indigo-800'>Add Service</h1>
      <form 
        className='space-y-3'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='p-5 rounded-lg shadow-md bg-card space-y-3 lg:space-y-0'>
          <div className='space-y-3 lg:space-y-0 lg:mb-4 lg:grid lg:grid-cols-2 lg:gap-4'>
            <label className='block'>
              <span className='font-bold text-gray-800 text-md'>Service Title</span>
              <input 
                className=''
                name="serviceTitle"
                ref={register}
                type="text"
                placeholder="Enter name of service"
              />
              {errors.serviceTitle && <p className='px-2 text-sm text-red-500'>{errors.serviceTitle.message}</p>}
            </label>
            <label className='block'>
              <span className='font-bold text-gray-800 text-md'>Service Charge</span>
              <input 
                className=''
                name="price"
                ref={register}
                type="number"
                placeholder="Enter the charge of service"
              />
              {errors.price && <p className='px-2 text-sm text-red-500'>{errors.price.message}</p>}
            </label>
          </div>
          <div className='lg:grid lg:grid-cols-2 lg:gap-4 space-y-3 lg:space-y-0'>
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
            <label className='block'>
              <span className='font-bold text-gray-800 text-md'>Photo</span>
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
                placeholder="Enter the price of artwork"
                ref={fileRef}
                style={{opacity: '0', width: '0.1px', height: '0.1px', position: 'absolute'}}
                onChange={() => setFileName(fileRef.current.files[0].name)}
              />
              {fileError && <p className='px-2 text-sm text-red-500'>{fileError}</p>}
              {fileName && <p className='px-2 text-md'>{fileName}</p>}
            </label>
          </div>
        </div>
        <div className='flex flex-row-reverse'>
          <input
            className='block py-3 rounded-lg transform transition bg-indigo-500 hover:bg-indigo-600 hover:-translate-y-0.5 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 uppercase tracking-wider font-semibold text-sm text-white shadow sm:text-base cursor-pointer px-6'
            type='submit'
            value='Save'/>
        </div>
      </form>
    </div>
  )
}

export default AddService;
