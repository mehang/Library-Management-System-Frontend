import React, {Component, Fragment} from "react";

import {Button, Col, Input, Row} from 'antd';
import PropTypes from 'prop-types';

import {EMPTY_STRING} from "../../constants/constants";
import {isEmpty, isNumber} from "../../utils/utils";
import {
    validatePassword1,
    validatePassword2,
    validateUsername,
    validateEmail,
    validatePhoneNumber,
    validateName
} from "../../common/form-validations";

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

    onPassword1Change = e => this.setState({password1: e.target.value});

    onPassword2Change = e => this.setState({password2: e.target.value});

    onNameChange = e => this.setState({name: e.target.value});

    onPhoneNumberChange = e => {
        if (isNumber(e.target.value) || isEmpty(e.target.value)) {
            this.setState({phoneNumber: e.target.value});
        }
    };

    onEmailChange = e => this.setState({email: e.target.value});


    handleSubmit = e => {
        e.preventDefault();
        const {username, password1, password2, name, phoneNumber, email, validation} = this.state;
        validateUsername(this);
        validatePassword1(this);
        validatePassword2(this);
        validateName(this);
        validateEmail(this);
        validatePhoneNumber(this);
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
                            <Col span={7}>
                                <label className="required-field">Name</label>
                            </Col>
                            <Col span={16}>
                                <Input
                                    value={name}
                                    onChange={this.onNameChange}
                                    onBlur={() => validateName(this)}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.name.error &&
                                <div className="input-error">{this.state.validation.name.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={7}>
                                <label className="required-field">Username</label>
                            </Col>
                            <Col span={16}>
                                <Input
                                    value={username}
                                    onChange={this.onUsernameChange}
                                    onBlur={() =>validateUsername(this)}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.username.error &&
                                <div className="input-error">{this.state.validation.username.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={7}>
                                <label className="required-field">Password</label>
                            </Col>
                            <Col span={16}>
                                <Input
                                    value={password1}
                                    type="password"
                                    onChange={this.onPassword1Change}
                                    onBlur={() =>validatePassword1(this)}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.password1.error &&
                                <div className="input-error">{this.state.validation.password1.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={7}>
                                <label className="required-field">Retype Password</label>
                            </Col>
                            <Col span={16}>
                                <Input
                                    value={password2}
                                    type="password"
                                    onChange={this.onPassword2Change}
                                    onBlur={() =>validatePassword2(this)}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.password2.error &&
                                <div className="input-error">{this.state.validation.password2.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={7}>
                                <label className="required-field">Email</label>
                            </Col>
                            <Col span={16}>
                                <Input
                                    value={email}
                                    onChange={this.onEmailChange}
                                    onBlur={() => validateEmail(this)}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.email.error &&
                                <div className="input-error">{this.state.validation.email.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={7}>
                                <label className="required-field">Phone Number</label>
                            </Col>
                            <Col span={16}>
                                <Input
                                    value={phoneNumber}
                                    onChange={this.onPhoneNumberChange}
                                    onBlur={() => validatePhoneNumber(this)}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.phoneNumber.error &&
                                <div className="input-error">{this.state.validation.phoneNumber.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    {extraFormFields}
                    <div style={{marginTop:"26px"}}>
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                        Save
                    </Button>
                    </div>
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