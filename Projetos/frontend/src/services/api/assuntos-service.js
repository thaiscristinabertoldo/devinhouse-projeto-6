import { URLS } from '../constants';
import * as Api from './http-service';
import keycloak from '../../keycloak';

export const getAllAssuntos = async () => {
  const reqConfig = {
    headers: { Authorization: `Bearer ${keycloak.token}` },
  };
  return await Api.read(`${URLS.ASSUNTOS}`, reqConfig).then((response) => response.data);
};
