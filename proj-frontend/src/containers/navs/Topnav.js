import React, { Component } from "react";
import { injectIntl } from "react-intl";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { connect } from "react-redux";
import { serverURL } from "../../constants/defaultValues";
import {

  logoutUser,

} from "../../redux/actions";

import {
  isDarkSwitchActive,
} from "../../constants/defaultValues";
import TopnavDarkSwitch from "./Topnav.DarkSwitch";


class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: "",
    };
  }
  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };
  componentDidMount() {
    fetch(`${serverURL}/users/details`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserID: localStorage.getItem("user_id"),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const { Username } = result;
        this.setState({ Username });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <nav className="navbar fixed-top">
        <div className="d-flex align-items-center navbar-left">
          
        </div>
        <a className="navbar-logo" href="/">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>
        <div className="navbar-right">
          {isDarkSwitchActive && <TopnavDarkSwitch />}

          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                <span
                  className="name mr-2 ml-5"
                  style={{ fontSize: 24, fontWeight: "bolder" }}
                >{`Welcome ${this.state.Username.toUpperCase()}!`}</span>
                <i
                  style={{ paddingLeft: 5, fontSize: 32 }}
                  className="iconsminds-profile"
                />
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                <DropdownItem
                  onClick={() =>
                    this.props.history.push("/app/user/my-account")
                  }
                >
                  Account
                </DropdownItem>
                <DropdownItem
                  onClick={() => this.props.history.push("/app/user/history")}
                >
                  Bookings
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.handleLogout()}>
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
};
export default injectIntl(
  connect(null, {
    logoutUser,

  })(TopNav)
);
