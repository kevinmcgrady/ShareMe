import React, { useState, useEffect, useCallback } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/queries';
import Spinner from './Spinner';
import { addCommentToSanity, fetchFromSanity } from '../utils/endpoints';

function PinDetail({ user }) {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  const { pinId } = useParams();

  const fetchPinDetails = useCallback(() => {
    let query = pinDetailQuery(pinId);

    if (query) {
      fetchFromSanity(query).then((data) => {
        setPinDetail(data[0]);
        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);
          fetchFromSanity(query).then((data) => {
            setPins(data);
          });
        }
      });
    }
  }, [pinId]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);
      addCommentToSanity(pinId, user, comment).then(() => {
        fetchPinDetails();
        setComment('');
        setAddingComment(false);
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId, fetchPinDetails]);

  if (!pinDetail) {
    return <Spinner message='Loading pin...' />;
  }

  return (
    <>
      <div
        className='flex xl:flex-row flex-col m-auto bg-white'
        style={{ maxWidth: '1500px' }}
      >
        <div className='relative p-4'>
          {!hasImageLoaded && (
            <div className='w-full bg-gray-50 h-340 rounded-lg'></div>
          )}
          <img
            onLoad={() => setHasImageLoaded(true)}
            src={pinDetail?.image && urlFor(pinDetail.image).url()}
            className='rounded-t-lg rounded-b-lg w-full'
            alt='user-post'
          />

          <div className='absolute top-10 right-10'>
            <a
              onClick={(e) => e.stopPropagation()}
              download
              href={`${pinDetail?.image?.asset?.url}?dl=`}
              className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-lg opacity-70 hover:opacity-100 hover:shadow-md outline-none'
            >
              <MdDownloadForOffline />
            </a>
          </div>
          <div className='flex items-center justify-between mt-5'>
            <Link
              to={`/user-profile/${pinDetail?.postedBy?._id}`}
              className='flex gap-2 items-center bg-white rounded-lg'
            >
              <img
                src={pinDetail?.postedBy?.image}
                alt='user'
                className='w-10 h-10 rounded-full'
              />
              <p className='font-semibold capitalize'>
                {pinDetail.postedBy.userName}
              </p>
            </Link>
            <div className='flex items-center text-gray-500 text-sm'>
              <a
                href={`${pinDetail.destination}`}
                target='_blank'
                rel='noreferrer'
              >
                {pinDetail.destination}
              </a>
            </div>
          </div>
        </div>
        <div className='w-full p-5 flex-1 xl:min-w-620'>
          <div>
            <h1 className='text-4xl font-bold break-words mt-3'>
              {pinDetail.title}
            </h1>
            <p className='mt-8'>{pinDetail.about}</p>
          </div>
          <h2 className='mt-8 text-lg font-semibold self-center'>Comments</h2>
          <div className='max-h-370 overflow-y-auto'>
            {pinDetail?.comments?.map((comment, i) => (
              <div
                key={i}
                className='flex gap-2 mt-5 items-center bg-white rounded-lg'
              >
                <Link to={`/user-profile/${pinDetail?.postedBy?._id}`}>
                  <img
                    src={comment.postedBy.image}
                    alt='user-profile'
                    className='w-10 h-10 rounded-full cursor-pointer'
                  />
                </Link>
                <div className='flex flex-col'>
                  <p className='font-bold'>{comment.postedBy.userName}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex flex-wrap mt-6 gap-3 items-center'>
            <Link to={`/user-profile/${pinDetail?.postedBy?._id}`}>
              <img
                className='w-10 h-10 rounded-full cursor-pointer'
                src={user?.image}
                alt='user'
              />
            </Link>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type='text'
              placeholder='Add a comment'
              className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300'
            />
            <button
              onClick={addComment}
              type='button'
              className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
            >
              {addingComment ? 'Posting the comment...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
      {pins?.length > 0 && (
        <>
          <h2 className='text-center font-bold text-2xl mt-8 mb-4'>
            More like this
          </h2>
          <MasonryLayout pins={pins} />
        </>
      )}
    </>
  );
}

export default PinDetail;
