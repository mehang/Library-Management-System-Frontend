import React, {Component} from 'react';
import {EMPTY_STRING, msgType} from "../../constants/constants";
import {Button, Col, Input, Row} from "antd";
import LayoutWrapper from "../LayoutWrapper";

class PasswordChangeForm extends Component{
    constructor(props){
        super(props);
        this.state={
            password1: EMPTY_STRING,
            password2: EMPTY_STRING,
            validation: {
                password1: {
                    required: true,
                    error: EMPTY_STRING
                },
                password2: {
                    required: true,
                    error: EMPTY_STRING
                },
            },
            statusMsgType: msgType.SUCCESS,
            statusMsg: EMPTY_STRING,
        };
    }

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

    clearStatus = () => {
        this.setState({statusMsgType: msgType.SUCCESS, statusMsg: EMPTY_STRING});
    };

    render(){
        const { password1, password2, statusMsg, statusMsgType} = this.state;
        const statusClassName = statusMsgType === msgType.ERROR ?
            'error-status' : 'success-status';
        return (
            <div style={{paddingTop: "30px", backgroundColor: "#bae7ff", height: "100%"}}>
                <div className="registration-form-container">
                    <div className="ant-form ant-form-horizontal"
                         style={{width: "100%", height: "100%"}}>
                        <div className="registration-form">
                            <div style={{fontSize: "x-large", fontWeight: "bold", marginBottom: "12px"}}>
                                Change Password
                            </div>
                            <form>
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
                                                onBlur={this.validatePassword1}
                                                onClick={this.clearStatus}
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
                                                onBlur={this.validatePassword2}
                                                onClick={this.clearStatus}
                                            />
                                            {this.state.validation.password2.error &&
                                            <div className="input-error">{this.state.validation.password2.error}</div>}
                                        </Col>
                                    </Row>
                                </div>
                                <div style={{marginTop:"26px"}}>
                                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                                        Change Password
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

const WrappedPasswordChangeForm = LayoutWrapper(PasswordChangeForm);
export default WrappedPasswordChangeForm;