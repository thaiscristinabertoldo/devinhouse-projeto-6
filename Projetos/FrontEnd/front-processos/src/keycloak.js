import Keycloak from "keycloak-js";

const keycloak = Keycloak({
	url: "https://training.dev.delivery/auth/",
	realm: "grupo05",
	clientId: "frontend",
});

export default keycloak;