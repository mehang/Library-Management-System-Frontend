import React, {Component, Fragment} from 'react';

import {APIUrls} from "../../constants/urls";
import {EMPTY_STRING, msgType, TOKEN_KEY, USER_ID, userType} from "../../constants/constants";
import UserForm from "../UserForm";
import {hasWhiteSpace, isEmpty, isLoggedIn, isNumber} from "../../utils/utils";
import {Button, Col, Input, Row} from "antd";
import {validateEmail, validatePhoneNumber} from "../../utils/validators";
import LayoutWrapper from "../LayoutWrapper";

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: EMPTY_STRING,
            name: EMPTY_STRING,
            email: EMPTY_STRING,
            phoneNumber: EMPTY_STRING,
            validation: {
                username: {
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
            },
            statusMsgType: msgType.SUCCESS,
            statusMsg: EMPTY_STRING,
        }
    }

    componentDidMount() {
        this.fetchProfile();
    }

    fetchProfile = () => {
        const baseApiUrl = this.getBaseApiUrl();
        const id = localStorage.getItem(USER_ID);
        fetch(`${baseApiUrl}${id}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Error while fetching profile data.');
                }
            })
            .then(data => {
                this.setState({username:data.username, name: data.name,
                phoneNumber:data.phoneNumber,email:data.email});
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
                return false;
            });
    };

    getBaseApiUrl = () => isLoggedIn(userType.STUDENT) ? APIUrls.Student :
        (isLoggedIn(userType.LIBRARIAN) ? APIUrls.Librarian : APIUrls.Admin);

    updateProfile = (username, name, email, phoneNumber) => {
        const id = localStorage.getItem(USER_ID);
        const token= localStorage.getItem(TOKEN_KEY);
        const data = {
            method: 'PUT',
            body: JSON.stringify({
                'id': id,
                'username': username,
                'name': name,
                'email': email,
                'phoneNumber': phoneNumber,
            }),
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'test': 'testing header'
            }
        };
        console.log(data);
        const baseApiUrl = this.getBaseApiUrl();
        fetch(baseApiUrl + id, data)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Problem in network connectivity.")
                }
            })
            .then(data => {
                this.setState({statusMsgType: msgType.SUCCESS, statusMsg: "Updated profile successfully."});
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
                return false;
            });
    };

    onUsernameChange = e => this.setState({username: e.target.value});

    validateUsername = () => {
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
        if (isNumber(e.target.value) || isEmpty(e.target.value)) {
            this.setState({phoneNumber: e.target.value});
        }
    };

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
        const {username, name, phoneNumber, email, validation} = this.state;
        this.validateUsername();
        this.validateName();
        this.validateEmail();
        this.validatePhoneNumber();
        if (!(validation.username.error ||  validation.name.error ||
            validation.phoneNumber.error || validation.email.error)) {
            this.updateProfile(username, name,email, phoneNumber);
        }
    };

    clearStatus = () => {
        this.setState({statusMsgType: msgType.SUCCESS, statusMsg: EMPTY_STRING});
    };

    render() {
        const {username,  name, phoneNumber, email,
            statusMsg, statusMsgType} = this.state;
        const statusClassName = statusMsgType === msgType.ERROR ?
            'error-status' : 'success-status';

        return (
            <div style={{paddingTop: "30px", backgroundColor: "#bae7ff", height: "100%"}}>
                <div className="registration-form-container">
                    <div className="ant-form ant-form-horizontal"
                         style={{width: "100%", height: "100%"}}>
                        <div className="registration-form">
                            <div style={{fontSize: "x-large", fontWeight: "bold", marginBottom: "12px"}}>
                                Profile
                            </div>
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
                                                onBlur={this.validateName}
                                                onClick={this.clearStatus}
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
                                                onBlur={this.validateUsername}
                                                onClick={this.clearStatus}
                                            />
                                            {this.state.validation.username.error &&
                                            <div className="input-error">{this.state.validation.username.error}</div>}
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
                                                onBlur={this.validateEmail}
                                                onClick={this.clearStatus}
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
                                                onBlur={this.validatePhoneNumber}
                                                onClick={this.clearStatus}
                                            />
                                            {this.state.validation.phoneNumber.error &&
                                            <div className="input-error">{this.state.validation.phoneNumber.error}</div>}
                                        </Col>
                                    </Row>
                                </div>
                                <div style={{marginTop:"26px"}}>
                                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                                        Update
                                    </Button>
                                </div>
                            </form>
                            {statusMsg && <div className={statusClassName}>{statusMsg}</div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const WrappedProfilePage = LayoutWrapper(ProfilePage);

export default WrappedProfilePage;