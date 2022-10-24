import { v4 as uuidv4 } from 'uuid';
import { client } from '../../client';

export const savePinToSanity = (isAlreadySaved, id, user) => {
  if (!isAlreadySaved) {
    return client
      .patch(id)
      .setIfMissing({ save: [] })
      .insert('after', 'save[-1]', [
        {
          _key: uuidv4(),
          userID: user.googleId,
          postedBy: {
            _type: 'postedBy',
            _ref: user.googleId,
          },
        },
      ])
      .commit();
  }
  return;
};
