import { BrowserRouter as Router, Redirect } from "react-router-dom";

import { useKeycloak } from "@react-keycloak/web";

import HomePage from "../pages/Home";
import { PrivateRoute } from "./utils";

export const AppRouter = () => {
	const { initialized } = useKeycloak();

	if (!initialized) {
		return <div>Loading...</div>;
	}

	return (
		<Router>
			<Redirect from="/" to="/home" />
			<PrivateRoute path="/home" component={HomePage} />
		</Router>
	);
};
