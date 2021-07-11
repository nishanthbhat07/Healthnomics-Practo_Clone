import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const RenderClinics = React.lazy(() => import("./renderClinics"));
const RenderConsult = React.lazy(() => import("./renderDocs"));
const SDC = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        exact
        path={`${match.url}/:location/:parameter`}
        render={(props) => <RenderClinics {...props} />}
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
export default SDC;
