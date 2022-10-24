import { client } from '../../client';

export const uploadImageToSanity = (name, type, file) => {
  const fileTypes = [
    'image/png',
    'image/svg',
    'image/jpeg',
    'image/gif',
    'image/tiff',
  ];

  if (fileTypes.includes(type)) {
    return client.assets.upload('image', file, {
      contentType: type,
      filename: name,
    });
  }

  return;
};
