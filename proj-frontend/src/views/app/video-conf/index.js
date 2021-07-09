import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Video = React.lazy(() => import("./videoconf"));
const Gogo = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/live`}
        render={(props) => <Video {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Gogo;
