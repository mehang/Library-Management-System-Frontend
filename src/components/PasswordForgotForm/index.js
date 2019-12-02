import React, {Component} from 'react';
import {Button, Icon, Input} from "antd";
import {APIUrls} from "../../constants/urls";
import {showErrorModal, showSuccessModal} from "../../utils/utils";

const {Search} =Input;

class PasswordForgotForm extends Component {
    constructor(props) {
        super(props);
        this.state ={
            loading: false,
        }
    }

    sendResetLink = (value, e) => {
        e.preventDefault();
        this.setState({loading: true});
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'email': value,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.ForgotPassword, data)
            .then(res => {
                if (res.ok) {
                    this.setState({loading:false});
                    showSuccessModal("Sent Reset Link",
                        "A reset link has been sent to this email address. Please go through that link to reset password.");
                    this.props.history.push("/login");
                } else {
                    throw new Error("Invalid email address.");
                }
            })
            .catch(error => {
                this.setState({loading:false});
                showErrorModal("Error", error.toString());
            })
    };

    render() {
        return (
            <div style={{paddingTop: "130px", backgroundColor: "#bae7ff", height: "100vh"}}>
                <Button
                    type="primary" shape="circle" size="large"
                    style={{position:"absolute", top:"20px", left:"20px"}}
                    onClick={() => this.props.history.push("/")}
                >
                    <Icon type="home"/>
                </Button>
                <div style={{margin:"auto",width:"420px"}}>
                    <div style={{fontSize: "x-large", fontWeight: "bold", marginBottom: "12px"}}>
                        Forgot Password?
                    </div>
                    <Search placeholder="Enter email address"
                            loading={this.state.loading}
                            enterButton
                            onSearch={this.sendResetLink}

                    />
                </div>
            </div>
        )
    }
}

export default PasswordForgotForm;