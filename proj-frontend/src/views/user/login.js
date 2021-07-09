import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { NotificationManager } from "../../components/common/react-notifications";
import { Formik, Form, Field } from "formik";

import { loginUser } from "../../redux/actions";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      notification: false,
    };
  }

  onUserLogin = async (values) => {
    if (!this.props.loading) {
      if (values.email !== "" && values.password !== "") {
        this.props.loginUser(values, this.props.history);
      }
    }
  };

  validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Please enter your password";
    } else if (value.length < 4) {
      error = "Value must be longer than 3 characters";
    }
    return error;
  };

  componentDidUpdate() {
    if (this.props.error) {
      NotificationManager.warning(
        this.props.error,
        "Login Error",
        3000,
        null,
        null,
        ""
      );
    }
  }

  render() {
    const { password, email } = this.state;
    const initialValues = { email, password };

    return (
      <>
        <Helmet>
          <title>Healthnomics | Login</title>
        </Helmet>
        <Row className="h-100">
          <Colxx xxs="12" md="10" className="mx-auto my-auto">
            <Card className="auth-card">
              <div className="position-relative image-side ">
                <p className="white mb-0" style={{ fontSize: 18 }}>
                  Please use your credentials to login.
                  <br />
                  If you are not a member, please{" "}
                  <NavLink
                    to={`/user/register`}
                    className="white"
                    style={{ fontWeight: "bolder" }}
                  >
                    Register
                  </NavLink>
                  .
                </p>
              </div>
              <div className="form-side">
                <NavLink to={`/`} className="white">
                  <span className="logo-single" />
                </NavLink>
                <CardTitle className="mb-4">
                  <IntlMessages id="user.login-title" />
                </CardTitle>

                <Formik
                  initialValues={initialValues}
                  onSubmit={this.onUserLogin}
                >
                  {({ errors, touched }) => (
                    <Form className="av-tooltip tooltip-label-bottom">
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="user.email" />
                        </Label>
                        <Field
                          className="form-control"
                          name="email"
                          validate={this.validateEmail}
                        />
                        {errors.email && touched.email && (
                          <div className="invalid-feedback d-block">
                            {errors.email}
                          </div>
                        )}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="user.password" />
                        </Label>
                        <Field
                          className="form-control"
                          type="password"
                          name="password"
                          validate={this.validatePassword}
                        />
                        {errors.password && touched.password && (
                          <div className="invalid-feedback d-block">
                            {errors.password}
                          </div>
                        )}
                      </FormGroup>
                      <div className="d-flex justify-content-between align-items-center">
                        <NavLink to={`/user/forgot-password`}>
                          <IntlMessages id="user.forgot-password-question" />
                        </NavLink>
                        <Button
                          color="primary"
                          className={`btn-shadow btn-multiple-state ${
                            this.props.loading ? "show-spinner" : ""
                          }`}
                          size="lg"
                        >
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                          <span className="label">
                            <IntlMessages id="user.login-button" />
                          </span>
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </Card>
          </Colxx>
          {this.state.notification
            ? NotificationManager.success(
                "Click here if you are not redirected within 4 seconds",
                "Login Successfull",
                3000,
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
  const { user, loading, error } = authUser;
  return { user, loading, error };
};

export default connect(mapStateToProps, {
  loginUser,
})(Login);
