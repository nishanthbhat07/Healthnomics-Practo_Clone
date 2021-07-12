import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import AppLayout from "../../layout/AppLayout";

const DCL = React.lazy(() =>
  import(/* webpackChunkName: "viwes-DCL" */ "./DoctorConsultList")
);
const VideoConference = React.lazy(() => import("./video-conf"));

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/dashboard`}
              />
              <Route
                path={`${match.url}/dashboard`}
                render={(props) => <DCL {...props} />}
              />

              <Route
                path={`${match.url}/online-consultation`}
                render={(props) => <VideoConference {...props} />}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}

export default withRouter(App);
