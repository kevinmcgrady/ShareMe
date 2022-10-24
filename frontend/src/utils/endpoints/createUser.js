import { client } from '../../client';

export const createUser = (user) => {
  const doc = {
    _id: user.googleId,
    _type: 'user',
    userName: user.name,
    image: user.imageUrl,
  };

  return client.createIfNotExists(doc);
};
