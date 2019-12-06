import React, {Component} from 'react';

import {APIUrls} from "../../../constants/urls";
import {EMPTY_STRING, msgType, VERIFICATION_ID} from "../../../constants/constants";
import UserForm from "../../UserForm";
import {isEmpty, isNumber, showErrorModal} from "../../../utils/utils";
import {Redirect} from "react-router-dom";
import {Button, Col, Icon, Input, Row} from "antd";

class StudentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            degree: EMPTY_STRING,
    }
    }


    registerStudent = (username, password1, password2, name, email, phoneNumber) => {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password1': password1,
                'password2': password2,
                'name': name,
                'email': email,
                'phoneNumber': phoneNumber,
                'degree': this.state.degree
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.Student, data)
            .then(res => res.json())
            .then(data => {
                if (isNumber(data.status) && data.status !== 200) {
                    throw new Error(data.message);
                }
                this.props.history.push('/success');
                return true;
            })
            .catch(error => {
                showErrorModal("Error", error.toString());
                return false;
            });
    };

    clearStatus = () => {
        this.setState({statusMsgType: msgType.SUCCESS, statusMsg: EMPTY_STRING});
    };


    render() {
        const verificationID = localStorage.getItem(VERIFICATION_ID);
        if (isEmpty(verificationID)) {
            return <Redirect to="student-verification"/>
        }

        const degreeField = (
            <div className="form-row">
                <Row type="flex" justify="start" align="middle">
                    <Col span={7}>
                        <label>Degree</label>
                    </Col>
                    <Col span={16}>
                        <Input
                            value={this.state.degree}
                            onChange={e => this.setState({degree:e.target.value})}
                        />
                    </Col>
                </Row>
            </div>
        );

        return (
            <div style={{paddingTop: "30px", backgroundColor: "#bae7ff", height: "100vh"}}>
                <Button
                    type="primary" shape="circle" size="large"
                    style={{position: "absolute", top: "20px", left: "20px"}}
                    onClick={() => this.props.history.push("/")}
                >
                    <Icon type="home"/>
                </Button>
                <div className="registration-form-container">
                    <div className="ant-form ant-form-horizontal"
                         style={{width: "100%", height: "100%"}}>
                        <div className="registration-form">
                            <div style={{fontSize: "x-large", fontWeight: "bold", marginBottom: "12px"}}>Registration
                            </div>
                            <UserForm
                                submitUser={this.registerStudent}
                                clearStatus={this.clearStatus}
                                extraFormFields={degreeField}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentForm;