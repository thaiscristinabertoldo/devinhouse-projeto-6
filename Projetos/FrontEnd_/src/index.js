import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import keycloak from "./keycloak";

import { ReactKeycloakProvider } from "@react-keycloak/web";

const eventLogger = (event, error) => {
	console.log("onKeycloakEvent", event, error);
};

const tokenLogger = (tokens) => {
	console.log("onKeycloakTokens", tokens);
};

ReactDOM.render(
	<React.StrictMode>
		<ReactKeycloakProvider //
			authClient={keycloak}
			onEvent={eventLogger}
			onTokens={tokenLogger}
		>
			<App />
		</ReactKeycloakProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
