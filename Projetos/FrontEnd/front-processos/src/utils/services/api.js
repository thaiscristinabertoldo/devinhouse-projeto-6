import axios from "axios";
import keycloak from '../../keycloak';

const kcToken = keycloak?.token ?? '';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP,
    headers: {
        Authorization: initialized ? `Bearer ${kcToken}` : undefined,
    },
});

export const get = async (url) => {
    try { return await axiosInstance.get(url);
    } catch (error) {
        console.error(error);
    }
};
  
export const post = async (url, data = {}, headers = {}) => {
    try { return await axiosInstance.post(url, data, headers);
    } catch (error) {
      console.error(error);
    }
};
  
export const put = async (url, data = {}, headers = {}) => {
    try {  return await axiosInstance.put(url, data, headers);
    } catch (error) {
        console.error(error);
    }
};
  
export const remove = async (url) => {
    try { return await axiosInstance.delete(url);
    } catch (error) {
        console.error(error);
    }
};