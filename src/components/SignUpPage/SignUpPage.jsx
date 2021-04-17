import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import googleLogo from '/img/logos/google-logo.svg';
import NavBar from "../shared-components/NavBar/NavBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const schema = yup.object().shape({
    name: yup.
      string().
      trim().
      required('Name is a required field'),
    email: yup.
      string().
      trim().
      email('Invalid email format').
      required('Email is a required field'),
    password: yup.
      string().
      required('Password is a required field').
      matches(
        /^[^\s]{6,}$/, 
        'Password must be composed of at least 6 non blank characters'
      ),
    passwordConfirmation: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match')
  });

  const auth = useAuth();
  const history = useHistory();

  const {register, handleSubmit, errors} = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });


  const onSubmit = async data => {
    try {
      const user = await auth.signUp(data.email, data.password);
      await user.updateProfile({
        displayName: data.name
      });
      history.push('/')
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-left",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <NavBar />
      <ToastContainer
        position="bottom-left"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />

      <div className='mt-8 mb-4 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='px-6 py-8 bg-white rounded-lg shadow bg-opacity-90 sm:px-10'>
          <h1 className='mb-5 text-2xl font-bold text-indigo-600'>Create an account</h1>
          <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
            <label className='block'>
              <span className='text-sm font-medium text-gray-700'>Full name</span>
              <input
                ref={register}
                type="text"
                name="name"
                placeholder="Enter your full name"
              />
              {errors.name && <p className='px-2 text-sm text-red-500'>{errors.name.message}</p>}
            </label>
            <label className='block'>
              <span className='text-sm font-medium text-gray-700'>Email address</span>
              <input
                ref={register}
                type="text"
                name="email"
                placeholder="Enter your email address"
              />
              {errors.email && <p className='px-2 text-sm text-red-500'>{errors.email.message}</p>}
            </label>
            <label className='block'>
              <span className='text-sm font-medium text-gray-700'>Password</span>
              <input
                ref={register} 
                type="password"
                name="password"
                placeholder="Enter your password"
              />
              {errors.password && <p className='px-2 text-sm text-red-500'>{errors.password.message}</p>}
            </label>
            <label className='block'>
              <span className='text-sm font-medium text-gray-700'>Confirm password</span>
              <input
                ref={register} 
                type="password"
                name="passwordConfirmation"
                placeholder="Enter your password again"
              />
              {errors.passwordConfirmation && <p className='px-2 text-sm text-red-500'>{errors.passwordConfirmation.message}</p>}
            </label>
            <input
              className='py-3 rounded-lg transform transition bg-indigo-500 hover:bg-indigo-600 hover:-translate-y-0.5 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 uppercase tracking-wider font-semibold text-sm text-white shadow sm:text-base cursor-pointer w-full block'
              type="submit"
              value="Create an account"
            />
            <p className='text-center'>
              <span className='text-sm'>Already have an account?</span> <Link className='ml-1 text-indigo-500 hover:underline' to='/login'>Login</Link>
            </p>
          </form>
        </div>
        <div className='flex items-center justify-center w-full my-3'>
          <hr className='inline-block w-full ml-12 mr-1 border-gray-400'/>
          <span className='text-gray-700'>Or</span>
          <hr className='inline-block w-full ml-1 mr-12 border-gray-400' />
        </div>
        <div 
          className='block bg-white bg-opacity-75 py-1 rounded-full transform transition border border-indigo-300  hover:bg-gray-100 hover:-translate-y-0.5 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 tracking-wider text-sm text-gray-700 shadow cursor-pointer w-3/4 mx-auto text-sm flex items-center justify-between font-semibold'
          onClick={() => socialSignIn('google')}
        >
          <img className='ml-1 justify-self-start w-9' src={googleLogo} alt='google logo' />
          <p className='w-full text-center'>Continue with Google</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
