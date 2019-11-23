import React, {Component, Fragment} from 'react';

import {APIUrls} from "../../../constants/urls";
import {EMPTY_STRING, msgType} from "../../../constants/constants";
import UserForm from "../../UserForm";

class StudentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusMsgType: msgType.SUCCESS,
            statusMsg: EMPTY_STRING,
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
                this.setState({statusMsgType: msgType.SUCCESS, statusMsg: "Registered successfully."});
                this.props.history.push('/success');
                return true;
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
                return false;
            });
    };

    clearStatus = () => {
        this.setState({statusMsgType: msgType.SUCCESS, statusMsg: EMPTY_STRING});
    };

    render() {
        const {statusMsg} = this.state;
        const statusClassName = this.state.statusMsgType === msgType.ERROR ? 'error-status' : 'success-status';

        return (
            <div style={{paddingTop: "30px", backgroundColor: "#bae7ff", height: "100vh"}}>
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
                            {statusMsg && <div className={statusClassName}>{statusMsg}</div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentForm;