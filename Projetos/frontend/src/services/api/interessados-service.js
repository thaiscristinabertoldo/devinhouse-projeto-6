import { URLS } from '../constants';
import * as Api from './http-service';
import keycloak from '../../keycloak';

export const getAllInteressados = async () => {
  const reqConfig = {
    headers: { Authorization: `Bearer ${keycloak.token}` },
  };
  return await Api.read(`${URLS.INTERESSADOS}`, reqConfig).then((response) => response.data);
};
