export const getFromStorage = async (query) => {
  return localStorage.getItem(query);
};

export const saveIntoStorage = async (query, data = {}) => {
  return localStorage.setItem(query, JSON.stringify(data));
};

export const removeFromStorage = async (query) => {
  return localStorage.removeItem(query);
};
