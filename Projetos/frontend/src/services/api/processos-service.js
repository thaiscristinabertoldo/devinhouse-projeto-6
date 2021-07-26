import { URLS } from '../constants';
import * as Api from './http-service';
import keycloak from '../../keycloak';

export const getAllProcess = async (params) => {
  const cd_assunto_descricao = params?.assuntoDesc;
  const nu_processo = params?.nuProcesso;

  const reqConfig = {
    headers: { Authorization: `Bearer ${keycloak.token}` },
    params: { cd_assunto_descricao, nu_processo },
  };

  return await Api.read(`${URLS.PROCESSOS}`, reqConfig).then((response) => response.data);
};

export const getProcessById = async (id) => {
  const reqConfig = {
    headers: { Authorization: `Bearer ${keycloak.token}` },
  };
  return await Api.read(`${URLS.PROCESSOS}/${id}`, reqConfig).then((response) => response.data);
};

export const createProcess = async (data) => {
  const reqConfig = {
    headers: { Authorization: `Bearer ${keycloak.token}` },
  };
  return await Api.create(URLS.PROCESSOS, data, reqConfig);
};

export const updateProcessById = async (id, data) => {
  const reqConfig = {
    headers: { Authorization: `Bearer ${keycloak.token}` },
  };
  return await Api.update(`${URLS.PROCESSOS}/${id}`, data, reqConfig);
};

export const deleteProcessById = async (id) => {
  const reqConfig = {
    headers: { Authorization: `Bearer ${keycloak.token}` },
  };
  return await Api.remove(`${URLS.PROCESSOS}/${id}`, reqConfig);
};
