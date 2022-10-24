import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { urlFor } from '../client';
import {
  deletePinFromSanity,
  fetchUser,
  savePinToSanity,
} from '../utils/endpoints';

function Pin({ pin }) {
  const navigate = useNavigate();
  const [isPostHovered, setPostHovered] = useState(false);
  const user = fetchUser();

  const isAlreadySaved = pin?.save?.filter(
    (item) => item.postedBy._id === user.googleId,
  )?.length;

  const savePin = (id) => {
    savePinToSanity(isAlreadySaved, id, user).then(() =>
      window.location.reload(),
    );
  };

  const deletePin = (id) => {
    deletePinFromSanity(id).then(() => window.location.reload());
  };

  return (
    <div className='m-2'>
      <div
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${pin._id}`)}
      >
        <img
          className='rounded-lg w-full'
          alt='user post'
          src={urlFor(pin.image).width(250).url()}
        />
        {isPostHovered && (
          <div
            style={{ height: '100%' }}
            className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
          >
            <div className='flex items-center justify-between'>
              <div className='flex gap-2'>
                <a
                  onClick={(e) => e.stopPropagation()}
                  download
                  href={`${pin?.image?.asset?.url}?dl=`}
                  className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-lg opacity-70 hover:opacity-100 hover:shadow-md outline-none'
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {!!isAlreadySaved ? (
                <button
                  onClick={(e) => e.stopPropagation()}
                  type='button'
                  className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                >
                  {pin?.save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(pin._id);
                  }}
                  type='button'
                  className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                >
                  Save
                </button>
              )}
            </div>
            <div className='flex justify-between items-center gap-2 w-full'>
              {pin?.destination && (
                <a
                  className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'
                  target='_black'
                  rel='noreferrer'
                  href={pin.destination}
                  onClick={(e) => e.stopPropagation()}
                >
                  <BsFillArrowUpRightCircleFill />
                  {pin.destination.length > 20
                    ? pin.destination.slice(11, 20)
                    : pin.destination.slice(11)}
                </a>
              )}
              {pin?.postedBy?._id === user.googleId && (
                <button
                  className='bg-white p-2 opacity-70 hover:opacity-100 font-bold text-dark rounded-3xl hover:shadow-md outline-none'
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(pin._id);
                  }}
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${pin?.postedBy?._id}`}
        className='flex gap-2 mt-2 items-center'
      >
        <img
          src={pin?.postedBy?.image}
          className='w-8 h-8 rounded-full object-cover'
          alt='user-profile'
        />
        <p className='font-semibold capitalize'>{pin?.postedBy?.userName}</p>
      </Link>
    </div>
  );
}

export default Pin;
