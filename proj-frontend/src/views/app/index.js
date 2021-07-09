import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";

const Gogo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ "./gogo")
);
const SecondMenu = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ "./second-menu")
);
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./blank-page")
);

const RenderList = React.lazy(() => import("./see-doctors-clinics"));
const MyAccount = React.lazy(() => import("../user/myAccount"));
const VideoConf = React.lazy(() => import("./video-conf"));
const Pay = React.lazy(() => import("./payment-gateway/pay"));
const UserHistory = React.lazy(() => import("./UserHistory"));

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
                path={`${match.url}/second-menu`}
                render={(props) => <SecondMenu {...props} />}
              />

              <Route
                path={`${match.url}/blank-page`}
                render={(props) => <BlankPage {...props} />}
              />
              <Route
                path={`${match.url}/show-doctors-clinics`}
                render={(props) => <RenderList {...props} />}
              />
              <Route
                path={`${match.url}/user/my-account`}
                render={(props) => <MyAccount {...props} />}
              />
              <Route
                path={`${match.url}/video-conference`}
                render={(props) => <VideoConf {...props} />}
              />
              <Route
                path={`${match.url}/pay`}
                render={(props) => <Pay {...props} />}
              />
              <Route
                path={`${match.url}/user/history`}
                render={(props) => <UserHistory {...props} />}
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
