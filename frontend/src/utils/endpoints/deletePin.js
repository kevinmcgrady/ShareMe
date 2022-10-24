import { client } from '../../client';

export const deletePinFromSanity = (id) => {
  return client.delete(id);
};
