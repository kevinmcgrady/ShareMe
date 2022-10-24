import { client } from '../../client';

export const fetchFromSanity = (query) => {
  return client.fetch(query);
};
