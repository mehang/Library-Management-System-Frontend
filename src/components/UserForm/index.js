import React, {Component, Fragment} from "react";

import {Button, Col, Input, Row} from 'antd';
import PropTypes from 'prop-types';

import {EMPTY_STRING} from "../../constants/constants";
import {validateEmail, validatePhoneNumber} from "../../utils/validators";
import {hasWhiteSpace, isNumber} from "../../utils/utils";

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: EMPTY_STRING,
            password1: EMPTY_STRING,
            password2: EMPTY_STRING,
            name: EMPTY_STRING,
            email: EMPTY_STRING,
            phoneNumber: EMPTY_STRING,
            validation: {
                username: {
                    required: true,
                    error: EMPTY_STRING
                },
                password1: {
                    required: true,
                    error: EMPTY_STRING
                },
                password2: {
                    required: true,
                    error: EMPTY_STRING
                },
                name: {
                    required: true,
                    error: EMPTY_STRING
                },
                phoneNumber: {
                    required: true,
                    error: EMPTY_STRING
                },
                email: {
                    required: true,
                    error: EMPTY_STRING
                },
            }
        }
    }

    clearInputs = () => this.setState({
        username: EMPTY_STRING, password1: EMPTY_STRING,
        password2: EMPTY_STRING, name: EMPTY_STRING,
        phoneNumber: EMPTY_STRING, email: EMPTY_STRING
    });

    onUsernameChange = e => this.setState({username: e.target.value});

    validateUsername = () => {
        console.log("asdf");
        let {validation} = this.state;
        if (this.state.username !== EMPTY_STRING) {
            if (hasWhiteSpace(this.state.username)) {
                validation.username.error = "Username cannot have space.";
            } else {
                validation.username.error = EMPTY_STRING;
            }
            this.setState({validation: validation});
        } else {
            if (validation.username.required) {
                validation.username.error = "This input is required.";
                this.setState({validation: validation});
            }
        }
    };

    onPassword1Change = e => this.setState({password1: e.target.value});

    validatePassword1 = () => {
        let {validation} = this.state;
        if (validation.password1.required && this.state.password1 === EMPTY_STRING) {
            validation.password1.error = "This input is required";
        } else {
            validation.password1.error = EMPTY_STRING;
        }
        this.setState({validation: validation});
    };

    onPassword2Change = e => this.setState({password2: e.target.value});

    validatePassword2 = () => {
        let {validation} = this.state;
        const {password1, password2} = this.state;
        if (password2 === EMPTY_STRING) {
            if (validation.password2.required) {
                validation.password2.error = "This input is required.";
                this.setState({validation: validation});
            }
        } else {
            if (password1 === password2) {
                validation.password2.error = EMPTY_STRING;
            } else {
                validation.password2.error = "The passwords are not matching with each other.";
            }
            this.setState({validation: validation});
        }
    };

    onNameChange = e => this.setState({name: e.target.value});

    validateName = () => {
        let {validation} = this.state;
        if (validation.name.required && this.state.name === EMPTY_STRING) {
            validation.name.error = "This input is required";
        } else {
            validation.name.error = EMPTY_STRING;
        }
        this.setState({validation: validation});
    };

    onPhoneNumberChange = e => {
        if (isNumber(e.target.value)) {
            this.setState({phoneNumber: e.target.value});
        }
    }

    validatePhoneNumber = () => {
        let {validation} = this.state;
        if (this.state.phoneNumber !== "") {
            if (!validatePhoneNumber(this.state.phoneNumber)) {
                validation.phoneNumber.error = "This input is not valid phone number.";
            } else {
                validation.phoneNumber.error = "";
            }
            this.setState({validation: validation});
        } else {
            if (validation.phoneNumber.required) {
                validation.phoneNumber.error = "This input is required.";
                this.setState({validation: validation});
            }
        }
    };

    onEmailChange = e => this.setState({email: e.target.value});

    validateEmail = () => {
        let {validation} = this.state;
        if (this.state.email !== EMPTY_STRING) {
            if (!validateEmail(this.state.email)) {
                validation.email.error = "This input is not valid E-mail.";
            } else {
                validation.email.error = EMPTY_STRING;
            }
            this.setState({validation: validation});
        } else {
            if (validation.email.required) {
                validation.email.error = "This input is required.";
                this.setState({validation: validation});
            }
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        const {username, password1, password2, name, phoneNumber, email, validation} = this.state;
        this.validateUsername();
        this.validatePassword1();
        this.validatePassword2();
        this.validateName();
        this.validateEmail();
        this.validatePhoneNumber();
        if (!(validation.username.error || validation.password1.error ||
            validation.password2.error || validation.name.error ||
            validation.phoneNumber.error || validation.email.error)) {
            const status = this.props.submitUser(username, password1, password2, name,email, phoneNumber);
            if (status) {
                this.clearInputs();
            }
        }
    };

    render() {
        const {username, password1, password2, name, phoneNumber, email} = this.state;
        const {extraFormFields, clearStatus} = this.props;
        return (
            <Fragment>
                <form>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={3}>
                                <label className="required-field">Username</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={username}
                                    onChange={this.onUsernameChange}
                                    onBlur={this.validateUsername}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.username.error &&
                                <div className="input-error">{this.state.validation.username.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={3}>
                                <label className="required-field">Password</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={password1}
                                    onChange={this.onPassword1Change}
                                    onBlur={this.validatePassword1}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.password1.error &&
                                <div className="input-error">{this.state.validation.password1.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={3}>
                                <label className="required-field">Retype Password</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={password2}
                                    onChange={this.onPassword2Change}
                                    onBlur={this.validatePassword2}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.password2.error &&
                                <div className="input-error">{this.state.validation.password2.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={3}>
                                <label className="required-field">Name</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={name}
                                    onChange={this.onNameChange}
                                    onBlur={this.validateName}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.name.error &&
                                <div className="input-error">{this.state.validation.name.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={3}>
                                <label className="required-field">Email</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={email}
                                    onChange={this.onEmailChange}
                                    onBlur={this.validateEmail}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.email.error &&
                                <div className="input-error">{this.state.validation.email.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={3}>
                                <label className="required-field">Name</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={phoneNumber}
                                    onChange={this.onPhoneNumberChange}
                                    onBlur={this.validatePhoneNumber}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.phoneNumber.error &&
                                <div className="input-error">{this.state.validation.phoneNumber.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    {extraFormFields}
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                        Register
                    </Button>
                </form>
            </Fragment>
        );
    }
}

UserForm.propTypes = {
    submitUser: PropTypes.func.isRequired,
    clearStatus: PropTypes.func.isRequired,
    extraFormFields: PropTypes.element
};

export default UserForm;