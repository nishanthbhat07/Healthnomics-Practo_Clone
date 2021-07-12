import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import TopNav from "../containers/navs/Topnav";
class AppLayout extends Component {
  render() {
    return (
      <div id="app-container">
        <TopNav history={this.props.history} />
        <main>
          <div className="container-fluid">{this.props.children}</div>
        </main>
      </div>
    );
  }
}

export default withRouter(AppLayout);
