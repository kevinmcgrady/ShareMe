export const storeUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};
