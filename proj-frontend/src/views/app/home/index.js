import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Home = React.lazy(() => import("./Home"));
const HomeRoute = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        render={(props) => <Home {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default HomeRoute;
