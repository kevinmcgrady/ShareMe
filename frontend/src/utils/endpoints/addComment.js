import { client } from '../../client';
import { v4 as uuidv4 } from 'uuid';

export const addCommentToSanity = (pinId, user, comment) => {
  return client
    .patch(pinId)
    .setIfMissing({ comments: [] })
    .insert('after', 'comments[-1]', [
      {
        comment,
        _key: uuidv4(),
        postedBy: {
          _type: 'postedBy',
          _ref: user?._id,
        },
      },
    ])
    .commit();
};
