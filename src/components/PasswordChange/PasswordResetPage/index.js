import React, {Component} from 'react';
import PasswordForgotForm from "../../PasswordForgotForm";
import LayoutWrapper from "../../LayoutWrapper";
import {APIUrls} from "../../../constants/urls";
import { USER_ID, USER_TYPE} from "../../../constants/constants";
import {showErrorModal, showSuccessModal} from "../../../utils/utils";
import PasswordChangeForm from "../PasswordChangeForm";

class PasswordResetPage extends Component {

    resetPassword = (password1, password2) => {
        const urlParams = new URLSearchParams(window.location.search);
        const resetToken = urlParams.get("token");
        const data = {
            method: 'POST',
            body: JSON.stringify({
                'resetToken': resetToken,
                'password1': password1,
                'password2': password2,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.ResetPassword, data)
            .then(res => {
                if (res.ok) {
                    showSuccessModal("Password Changed", "Password has been changed successfully.")
                    this.props.history.push("/login");
                } else {
                    throw new Error("Problem in network connectivity.")
                }
            })
            .catch(error => {
                showErrorModal("Error", "Error while resetting the password.");
            });
    };

    render() {
        return (
            <PasswordChangeForm onSubmit={this.resetPassword} header="Reset Password"/>
        );
    }
}

export default PasswordResetPage;