import React, { useEffect, useRef, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Sidebar, UserProfile } from '../components';
import logo from '../assets/logo.png';
import Pins from './Pins';
import { userQuery } from '../utils/queries';
import { fetchFromSanity, fetchUser } from '../utils/endpoints';

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const userInfo = fetchUser();

  useEffect(() => {
    const isUserLoggedIn = fetchUser();

    if (!isUserLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    fetchFromSanity(query).then((data) => setUser(data[0]));
  }, [userInfo?.googleId]);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user && user} />
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <HiMenu
            fontSize={40}
            className='cursor-pointer'
            onClick={() => setToggleSidebar(true)}
          />
          <Link to='/'>
            <img src={logo} alt='logo' className='w-28' />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img
              src={user?.image}
              alt='logo'
              className='w-10 h-10 rounded-full'
            />
          </Link>
        </div>
        {toggleSidebar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex justify-end items-center p-2'>
              <AiFillCloseCircle
                fontSize={30}
                className='cursor-pointer'
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
