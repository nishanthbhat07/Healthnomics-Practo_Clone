import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";

const Gogo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ "./gogo")
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
                render={(props) => <Gogo {...props} />}
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
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
