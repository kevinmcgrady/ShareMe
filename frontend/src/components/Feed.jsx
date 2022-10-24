import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { feedQuery, searchQuery } from '../utils/queries';
import { fetchFromSanity } from '../utils/endpoints';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

function Feed() {
  const [isLoading, setIsLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const query = categoryId ? searchQuery(categoryId) : feedQuery;
    fetchFromSanity(query).then((data) => {
      setPins(data);
      setIsLoading(false);
    });
  }, [categoryId]);

  if (isLoading) {
    return <Spinner message='We are adding new ideas to your feed!' />;
  }

  if (!pins?.length) {
    return (
      <h2 className='mt-2 text-center font-semibold text-xl'>No pins 🥲</h2>
    );
  }

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
}

export default Feed;
