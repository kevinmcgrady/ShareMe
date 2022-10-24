import React, { useState, useEffect } from 'react';
import MasonryLayout from './MasonryLayout';
import { feedQuery, searchQuery } from '../utils/queries';
import Spinner from './Spinner';
import { fetchFromSanity } from '../utils/endpoints';

function Search({ searchTerm }) {
  const [pins, setPins] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const query = searchTerm ? searchQuery(searchTerm) : feedQuery;
    setIsLoading(true);
    fetchFromSanity(query).then((data) => {
      setPins(data);
      setIsLoading(false);
    });
  }, [searchTerm]);

  if (isLoading) {
    return <Spinner message='Searching for pins...' />;
  }

  if (pins?.length !== 0) {
    return <MasonryLayout pins={pins} />;
  }

  return (
    <div className='mt-10 text-center text-xl'>
      <p>No pins found 🥲</p>
    </div>
  );
}

export default Search;
