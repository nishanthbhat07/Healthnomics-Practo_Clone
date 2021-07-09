import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const RenderDocs = React.lazy(() => import("./renderDocs"));
const RenderConsult = React.lazy(() => import("./renderOnlineConsult"));
const Gogo = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        exact
        path={`${match.url}/:location/:parameter`}
        render={(props) => <RenderDocs {...props} />}
      />
      <Route
        exact
        path={`${match.url}/consult/online/:par`}
        render={(props) => <RenderConsult {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Gogo;
