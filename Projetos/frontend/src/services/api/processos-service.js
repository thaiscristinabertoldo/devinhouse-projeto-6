import { URLS } from '../constants';
import * as Api from './http-service';
import keycloak from '../../keycloak';

export const getAllProcess = async ({ cdAssunto = '', chaveProcesso = '' }) => {
  const reqConfig = {
    headers: { Authorization: `Bearer ${keycloak.token}` },
    params: { cd_assunto_id: cdAssunto, chave_processo: chaveProcesso },
  };
  return await Api.read(`${URLS.PROCESSOS}`, reqConfig).then((response) => response.data);
};

export const getProcessById = async (id) => {
  return await Api.read(`${URLS.PROCESSOS}/${id}`);
};

export const createProcess = async (data) => {
  const reqConfig = {
    headers: { Authorization: `Bearer ${keycloak.token}` },
  };
  return await Api.create(URLS.PROCESSOS, data, reqConfig);
};

export const updateProcessById = async (data, id) => {
  return await Api.update(`${URLS.PROCESSOS}/${id}`, data);
};

export const deleteProcessById = async (id) => {
  const reqConfig = {
    headers: { Authorization: `Bearer ${keycloak.token}` },
  };
  return await Api.remove(`${URLS.PROCESSOS}/${id}`, reqConfig);
};
