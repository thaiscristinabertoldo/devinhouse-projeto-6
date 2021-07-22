import Keycloak from 'keycloak-js';

const keycloak = Keycloak({
  clientId: 'process-react',
  realm: 'Grupo02',
  url: 'https://training.dev.delivery/auth/',
  resource: 'process-react',
  'public-client': true,
});

export default keycloak;
