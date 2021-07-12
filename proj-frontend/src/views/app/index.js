import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import AppLayout from "../../layout/AppLayout";

const ChooseSpeciality = React.lazy(() => import("./ChooseSpeciality"));
const ChooseSymptoms = React.lazy(() => import("./ChooseSymptoms"));

const RenderList = React.lazy(() => import("./see-doctors-clinics"));
const MyAccount = React.lazy(() => import("../user/myAccount"));
const UserHistory = React.lazy(() => import("./UserHistory"));
const Home = React.lazy(() => import("./home"));

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect exact from={`${match.url}/`} to={`${match.url}/home`} />
              <Route
                path={`${match.url}/dashboard`}
                render={(props) => <ChooseSpeciality {...props} />}
              />
              <Route
                path={`${match.url}/home`}
                render={(props) => <Home {...props} />}
              />

              <Route
                path={`${match.url}/second-menu`}
                render={(props) => <ChooseSymptoms {...props} />}
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

export default withRouter(App);
