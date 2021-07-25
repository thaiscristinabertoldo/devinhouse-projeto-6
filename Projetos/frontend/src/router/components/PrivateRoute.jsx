import { Route, Redirect } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

export const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return auth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        );
      }}
    />
  );
};
