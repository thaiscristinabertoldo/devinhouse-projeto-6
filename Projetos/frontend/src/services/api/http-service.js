const { default: axios } = require('axios');
const { URLS } = require('../constants');

const axiosInstance = axios.create({
  baseURL: URLS.BASE,
  headers: {
    Authorization: 'Bearer ',
    'Content-Type': 'application/json',
  },
});

export const read = async (url) => {
  return await axiosInstance.get(url);
};

export const create = async (url, data = {}, headers = {}) => {
  return await axiosInstance.post(url, data, headers);
};

export const update = async (url, data = {}, headers = {}) => {
  return await axiosInstance.put(url, data, headers);
};

export const remove = async (url) => {
  return await axiosInstance.delete(url);
};
