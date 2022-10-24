import { client } from '../../client';

export const createPinToSanity = (fields, user) => {
  if (
    fields.title &&
    fields.about &&
    fields.destination &&
    fields.assetId &&
    fields.category
  ) {
    const doc = {
      _type: 'pin',
      title: fields.title,
      about: fields.about,
      destination: fields.destination,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: fields.assetId,
        },
      },
      userID: user._id,
      postedBy: {
        _type: 'postedBy',
        _ref: user._id,
      },
      category: fields.category,
    };

    return client.create(doc);
  }

  return;
};
