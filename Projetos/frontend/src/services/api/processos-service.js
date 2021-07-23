import { URLS } from '../constants';
import * as Api from './http-service';
import keycloak from '../../keycloak';

export const getAllProcess = async (params) => {
  const { cdAssunto, chaveProcesso } = params;
  const reqConfig = {
    headers: { Authorization: `Bearer ${keycloak.token}` },
    params: { cd_assunto_id: cdAssunto, chave_processo: chaveProcesso },
  };
  return await Api.read(`${URLS.PROCESSOS}`, reqConfig).then((response) => response.data);
};

export const getProcess = async (id) => {
  return await Api.read(`${URLS.PROCESSOS}/${id}`);
};

export const createProcess = async (data) => {
  return await Api.create(URLS.PROCESSOS, data);
};

export const updateProcess = async (data, id) => {
  return await Api.update(`${URLS.PROCESSOS}/${id}`, data);
};

export const deleteProcess = async (id) => {
  return await Api.remove(`${URLS.PROCESSOS}/${id}`);
};
