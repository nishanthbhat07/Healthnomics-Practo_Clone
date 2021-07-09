import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { resetPassword } from "../../redux/actions";
import { NotificationManager } from "../../components/common/react-notifications";
import { connect } from "react-redux";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            newPasswordAgain: ''
        };
    }

    onResetPassword = (values) => {
        if (!this.props.loading) {
            const params = new URLSearchParams(this.props.location.search);
            const oobCode = params.get('oobCode');
            if (oobCode) {
                if (values.newPassword !== "") {
                    this.props.resetPassword({ newPassword: values.newPassword, resetPasswordCode: oobCode, history: this.props.history });
                }
            } else {
                NotificationManager.warning(
                    "Please check your email url.",
                    "Reset Password Error",
                    3000,
                    null,
                    null,
                    ''
                );
            }

        }
    }

    validateNewPassword = (values) => {
        const { newPassword, newPasswordAgain } = values;
        let errors = {};
        if (newPasswordAgain && newPassword !== newPasswordAgain) {
            errors.newPasswordAgain = "Please check your new password";
        }
        return errors;
    }

    componentDidUpdate() {
        if (this.props.error) {
            NotificationManager.warning(
                this.props.error,
                "Forgot Password Error",
                3000,
                null,
                null,
                ''
            );
        } else {
            if (!this.props.loading && this.props.newPassword === "success")
                NotificationManager.success(
                    "Please login with your new password.",
                    "Reset Password Success",
                    3000,
                    null,
                    null,
                    ''
                );
        }

    }


    render() {
        const { newPassword, newPasswordAgain } = this.state;
        const initialValues = { newPassword, newPasswordAgain };

        return (
            <Row className="h-100">
                <Colxx xxs="12" md="10" className="mx-auto my-auto">
                    <Card className="auth-card">
                        <div className="position-relative image-side ">
                            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
                            <p className="white mb-0">
                                Please use your e-mail to reset your password. <br />
                                If you are not a member, please{" "}
                                <NavLink to={`/register`} className="white">
                                    register
                </NavLink>
                                .
              </p>
                        </div>
                        <div className="form-side">
                            <NavLink to={`/`} className="white">
                                <span className="logo-single" />
                            </NavLink>
                            <CardTitle className="mb-4">
                                <IntlMessages id="user.reset-password" />
                            </CardTitle>

                            <Formik
                                validate={this.validateNewPassword}
                                initialValues={initialValues}
                                onSubmit={this.onResetPassword}>
                                {({ errors, touched }) => (
                                    <Form className="av-tooltip tooltip-label-bottom">
                                        <FormGroup className="form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="user.new-password" />
                                            </Label>
                                            <Field
                                                className="form-control"
                                                name="newPassword"
                                                type="password"
                                            />
                                        </FormGroup>
                                        <FormGroup className="form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="user.new-password-again" />
                                            </Label>
                                            <Field
                                                className="form-control"
                                                name="newPasswordAgain"
                                                type="password"
                                            />
                                            {errors.newPasswordAgain && touched.newPasswordAgain && (
                                                <div className="invalid-feedback d-block">
                                                    {errors.newPasswordAgain}
                                                </div>
                                            )}
                                        </FormGroup>

                                        <div className="d-flex justify-content-between align-items-center">
                                            <NavLink to={`/user/login`}>
                                                <IntlMessages id="user.login-title" />
                                            </NavLink>
                                            <Button
                                                color="primary"
                                                className={`btn-shadow btn-multiple-state ${this.props.loading ? "show-spinner" : ""}`}
                                                size="lg"
                                            >
                                                <span className="spinner d-inline-block">
                                                    <span className="bounce1" />
                                                    <span className="bounce2" />
                                                    <span className="bounce3" />
                                                </span>
                                                <span className="label"><IntlMessages id="user.reset-password-button" /></span>
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </Card>
                </Colxx>
            </Row>
        );
    }
}

const mapStateToProps = ({ authUser }) => {
    const { newPassword, resetPasswordCode, loading, error } = authUser;
    return { newPassword, resetPasswordCode, loading, error };
};

export default connect(
    mapStateToProps,
    {
        resetPassword
    }
)(ResetPassword);

