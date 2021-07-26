export const getFromStorage = (query) => {
  return localStorage.getItem(query);
};

export const saveIntoStorage = (query, data = {}) => {
  return localStorage.setItem(query, JSON.stringify(data));
};

export const removeFromStorage = (query) => {
  return localStorage.removeItem(query);
};
