import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Chat = React.lazy(() =>
  import(/* webpackChunkName: "application-chat" */ "./chat")
);

const Applications = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/chat`}
        render={(props) => <Chat {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Applications;
