import { URLS } from '../constants';
import * as Api from './http-service';

export const getAllProcess = async () => {
  return await Api.read(URLS.PROCESSOS);
};

export const getProcess = async (id) => {
  return await Api.read(`${URLS.PROCESSOS}/${id}`);
};

export const createProcess = async (data) => {
  return await Api.create(URLS.PROCESSOS, data);
};

export const updateProcess = async (data, id) => {
  return await Api.put(`${URLS.PROCESSOS}/${id}`, data);
};

export const deleteProcess = async (id) => {
  return await Api.remove(`${URLS.PROCESSOS}/${id}`);
};
