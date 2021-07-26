const { default: axios } = require('axios');
const { URLS } = require('../constants');

const axiosInstance = axios.create({
  baseURL: URLS.BASE,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export const read = async (url, config = {}) => {
  return await axiosInstance.get(url, config);
};

export const create = async (url, data = {}, config = {}) => {
  return axiosInstance.post(url, data, config);
};

export const update = async (url, data = {}, headers = {}) => {
  return await axiosInstance.put(url, data, headers);
};

export const remove = async (url, config = {}) => {
  return await axiosInstance.delete(url, config);
};
