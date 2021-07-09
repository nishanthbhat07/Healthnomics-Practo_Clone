import React, { Component } from "react";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions";
import { NotificationManager } from "../../components/common/react-notifications";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";
import { Helmet } from "react-helmet";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      phone: "",
      noti: false,
    };
  }

  showError = (error) => {
    NotificationManager.error(error, "Register error", 3000, null, null, "");
  };
  onUserRegister = async () => {
    if (this.state.email !== "" && this.state.password !== "") {
      await this.props.registerUser(
        {
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
          phone: this.state.phone,
        },
        this.props.history
      );
    }
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <>
        <Helmet>
          <title>Healthnomics | Register</title>
        </Helmet>
        <Row className="h-100">
          <Colxx xxs="12" md="10" className="mx-auto my-auto">
            <Card className="auth-card">
              <div className="position-relative image-side ">
                <p className="white mb-0" style={{ fontSize: 18 }}>
                  Please use this form to register. <br />
                  If you are a member, please{" "}
                  <NavLink
                    to={`/user/login`}
                    className="white"
                    style={{ fontWeight: "bold" }}
                  >
                    Login
                  </NavLink>
                  .
                </p>
              </div>
              <div className="form-side">
                <NavLink to={`/`} className="white">
                  <span className="logo-single" />
                </NavLink>
                <CardTitle className="mb-4">
                  <IntlMessages id="user.register" />
                </CardTitle>
                <Form>
                  <Label className="form-group has-float-label mb-4">
                    <Input
                      type="name"
                      name="name"
                      onChange={this.handleChange}
                      defaultValue={this.state.name}
                    />
                    <IntlMessages id="user.fullname" />
                  </Label>
                  <Label className="form-group has-float-label mb-4">
                    <Input
                      type="email"
                      name="email"
                      onChange={this.handleChange}
                      defaultValue={this.state.email}
                    />
                    <IntlMessages id="user.email" />
                  </Label>
                  <Label className="form-group has-float-label mb-4">
                    <Input
                      type="password"
                      name="password"
                      onChange={this.handleChange}
                      defaultValue={this.state.password}
                    />
                    <IntlMessages id="user.password" />
                  </Label>
                  <Label className="form-group has-float-label mb-4">
                    <Input
                      type="text"
                      name="phone"
                      onChange={this.handleChange}
                      defaultValue={this.state.phone}
                    />
                    <IntlMessages id="user.phone" />
                  </Label>
                  <div className="d-flex justify-content-end align-items-center">
                    <Button
                      color="primary"
                      className="btn-shadow"
                      size="lg"
                      onClick={() => this.onUserRegister()}
                    >
                      <IntlMessages id="user.register-button" />
                    </Button>
                  </div>
                </Form>
              </div>
            </Card>
          </Colxx>
          {this.state.noti
            ? NotificationManager.success(
                "Click here if you are not redirected within 4 seconds",
                "Register Successfull",
                1500,
                () => {
                  this.props.history.push("/");
                },
                null,
                ""
              )
            : null}
        </Row>
      </>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(mapStateToProps, {
  registerUser,
})(Register);
