import Keycloak from 'keycloak-js';

const keycloak = Keycloak({
  url: 'http://localhost:8080/auth',
  realm: 'Test',
  clientId: 'react-test',
});

export default keycloak;
