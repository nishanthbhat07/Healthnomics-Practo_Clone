import React, { Component } from "react";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions";

import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      phone: "",
      clinicName: "",
    };
  }
  onUserRegister() {
    if (this.state.email !== "" && this.state.password !== "") {
      this.props.registerUser(
        { email: this.state.email, password: this.state.password },
        this.props.history
      );
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <>
        <Row className="h-100">
          <Colxx xxs="12" md="10" className="mx-auto my-auto">
            <Card className="auth-card">
              <div className="position-relative image-side ">
                <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
                <p className="white mb-0">
                  Please use this form to register. <br />
                  If you are a member, please{" "}
                  <NavLink to={`/user/login`} className="white">
                    login
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
                      required
                      onChange={this.handleChange}
                      defaultValue={this.state.name}
                    />
                    <IntlMessages id="user.fullname" />
                  </Label>
                  <Label className="form-group has-float-label mb-4">
                    <Input
                      type="email"
                      required
                      name="email"
                      onChange={this.handleChange}
                      defaultValue={this.state.email}
                    />
                    <IntlMessages id="user.email" />
                  </Label>
                  <Label className="form-group has-float-label mb-4">
                    <Input
                      type="password"
                      required
                      name="password"
                      onChange={this.handleChange}
                      defaultValue={this.state.password}
                    />
                    <IntlMessages id="user.password" />
                  </Label>
                  <Label className="form-group has-float-label mb-4">
                    <Input
                      type="text"
                      required
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
