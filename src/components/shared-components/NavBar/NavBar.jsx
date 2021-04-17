import React, {useState} from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import userLogo from '/img/logos/user.svg';
import brandLogo from '/img/logos/brand-logo.svg';
import { useHistory } from 'react-router-dom';

function NavBar({wide}) {
  const auth = useAuth();
  const history = useHistory();
  const [verticalMenu, setVerticalMenu] = useState(false);


  const handleLogging = () => {
    if (auth.user) {
      auth.signOut();
    } else {
      history.push('/login'); 
    }
  }

  return (
    <div className='bg-brand-light'>
      <header className={`flex flex-wrap items-center ${wide ? '' : 'max-w-5xl mx-auto'} px-6 lg:px-6 lg:py-0`}>
        <div className='flex items-center justify-center flex-1 my-2 lg:my-0 lg:justify-start'>
          <Link to='/'>
            <img className='w-24' src={brandLogo} alt='heo'/>
          </Link>
        </div>

        <svg onClick={() => setVerticalMenu(!verticalMenu)} className={`${verticalMenu ? 'hidden' : ''} block text-gray-900 cursor-pointer fill-current lg:hidden`} xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><title>menu</title><path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'></path></svg>
        <svg onClick={() => setVerticalMenu(!verticalMenu)} className={`${verticalMenu ? '' : 'hidden'} block text-gray-900 cursor-pointer fill-current lg:hidden`} xmlns="http://www.w3.org/2000/svg" width='25' height='25' fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
</svg>

        <div className={`${verticalMenu ? '' : 'hidden '} w-full lg:flex lg:items-center lg:w-auto`}>
          <nav>
            <ul className='items-center justify-between text-base text-gray-800 lg:flex lg:pt-0'>
              <li><Link className='block px-0 py-3 border-b-2 border-transparent lg:border-b-4 lg:px-4 lg:py-2 hover:border-indigo-600' to='/'>Home</Link></li>
              {
                auth?.user?.isAdmin && <li><Link className='block px-0 py-3 border-b-2 border-transparent lg:border-b-4 lg:px-4 lg:py-2 hover:border-pink-600' to='/admin'>Admin</Link></li>
              }
              {
                auth?.user && !auth.user.isAdmin && 
                  <li><Link className='block px-0 py-3 border-b-2 border-transparent lg:border-b-4 lg:px-4 lg:py-2 hover:border-yellow-600' to='/orders'>Orders</Link></li>
              }
            </ul>
          </nav>
          {
            auth?.user &&
            <div className='flex items-center justify-start mb-2 lg:ml-4 lg:mb-0 pointer-cursor'>
              <Link to='/'>
                <img className='w-10 h-10 border-2 border-transparent rounded-full hover:border-indigo-400' src={auth.user.photoURL || userLogo} alt='User Photo'/>
              </Link>
              <p className='text-base text-gray-700'>{auth.user ? auth.user.displayName : ''}</p>
            </div>
          }
          <div className='block px-0 py-3 mb-2 border-b-2 border-transparent cursor-pointer lg:border-b-4 lg:py-2 lg:px-4 hover:border-green-700 lg:mb-0' onClick={handleLogging}>
            {
              auth?.user ? 'Logout' : 'Login'
            }
          </div>   
        </div>
      </header>
    </div>
  );
}

export default NavBar;

