import React, {useState, useEffect, useRef} from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addAdmin} from '../../API/API';
import AsyncButton from '../shared-components/AsyncButton/AsyncButton';

function AddAdmin() {
  const auth = useAuth();
  const addAdminBtnRef = useRef();
  const schema = yup.object().shape({
    email: yup.
      string().
      trim().
      email('Invalid email format').
      required('Email is a required field'),
  });

  const {register, handleSubmit, errors} = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    addAdminBtnRef.current.disable();
    addAdmin(data.email).then(res => res.json()).then(data => {
      if (data.error) {
        toast.error(data.error, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success("Admin added successfully!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      addAdminBtnRef.current.activate();
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
      addAdminBtnRef.current.activate();
    });
  };

  return (
    <div className='pb-4'>
      <ToastContainer
        position="bottom-left"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <h1 className='my-3 text-4xl font-bold text-indigo-800'>Add new Admin</h1>
      <form 
        className='space-y-3'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='p-5 bg-white rounded-lg shadow-md bg-card space-y-3 lg:space-y-0'>
          <label className='block'>
            <span className='font-bold text-gray-800 text-md'>Email</span>
            <input 
              className=''
              name="email"
              ref={register}
              type="text"
              placeholder="john@doe.com"
            />
            {errors.email && <p className='px-2 text-sm text-red-500'>{errors.email.message}</p>}
          </label>
        </div>
        <div className='flex flex-row-reverse'>
          <AsyncButton
            ref={addAdminBtnRef}
            className='block px-6 py-3 text-sm font-semibold tracking-wider text-white uppercase rounded-lg shadow cursor-pointer transform transition sm:text-base'
            classNameOnActive='bg-indigo-500 hover:bg-indigo-600 hover:-translate-y-0.5 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none focus:ring'
            classNameOnDisabled='bg-gray-300 animate-pulse'
            type='submit'
          >
            Add Admin
          </AsyncButton>
        </div>
      </form>
    </div>
  )
}

export default AddAdmin;

