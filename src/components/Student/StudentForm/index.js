import React, {Component, Fragment} from 'react';

import {APIUrls} from "../../../constants/urls";
import {EMPTY_STRING, msgType, VERIFICATION_ID} from "../../../constants/constants";
import UserForm from "../../UserForm";
import {isEmpty, showErrorModal} from "../../../utils/utils";
import {Redirect} from "react-router-dom";
import {Button, Icon} from "antd";

class StudentForm extends Component {

    registerStudent = (username, password1, password2, name, email, phoneNumber) => {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password1': password1,
                'password2': password2,
                'name': name,
                'email': email,
                'phoneNumber': phoneNumber
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.Student, data)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Problem in network connectivity.")
                }
            })
            .then(data => {
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
        if (isEmpty(verificationID)){
            return <Redirect to="student-verification"/>
        }
        return (
            <div style={{paddingTop: "30px", backgroundColor: "#bae7ff", height: "100vh"}}>
                <Button
                    type="primary" shape="circle" size="large"
                    style={{position:"absolute", top:"20px", left:"20px"}}
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentForm;