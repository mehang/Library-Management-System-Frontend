import React, {Component} from 'react';
import {EMPTY_STRING, msgType} from "../../../constants/constants";
import {Button, Col, Input, Row} from "antd";
import PropTypes from 'prop-types';
import LayoutWrapper from "../../LayoutWrapper";
import {validatePassword1, validatePassword2} from "../../../common/form-validations";

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

    onPassword2Change = e => this.setState({password2: e.target.value});

    clearStatus = () => {
        this.setState({statusMsgType: msgType.SUCCESS, statusMsg: EMPTY_STRING});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.password1, this.state.password2);
    };

    render(){
        const { password1, password2, statusMsg, statusMsgType} = this.state;
        const statusClassName = statusMsgType === msgType.ERROR ?
            'error-status' : 'success-status';
        return (
            <div style={{paddingTop: "30px", backgroundColor: "#bae7ff", height: "100vh"}}>
                <div className="registration-form-container">
                    <div className="ant-form ant-form-horizontal"
                         style={{width: "100%", height: "100%"}}>
                        <div className="registration-form">
                            <div style={{fontSize: "x-large", fontWeight: "bold", marginBottom: "12px"}}>
                                {this.props.header}
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
                                                onBlur={() => validatePassword1(this)}
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
                                                onBlur={() => validatePassword2(this)}
                                                onClick={this.clearStatus}
                                            />
                                            {this.state.validation.password2.error &&
                                            <div className="input-error">{this.state.validation.password2.error}</div>}
                                        </Col>
                                    </Row>
                                </div>
                                <div style={{marginTop:"26px"}}>
                                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                                        {this.props.header}
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

PasswordChangeForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    header: PropTypes.string.isRequired,
};

export default PasswordChangeForm;
