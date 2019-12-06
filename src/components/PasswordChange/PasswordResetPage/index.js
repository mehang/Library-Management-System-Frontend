import React, {Component} from 'react';
import {APIUrls} from "../../../constants/urls";
import {isNumber, showErrorModal, showSuccessModal} from "../../../utils/utils";
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
            .then(data => {
                if (isNumber(data.status) && data.status !== 200) {
                    throw new Error(data.message);
                }
                    showSuccessModal("Password Changed", "Password has been changed successfully.")
                    this.props.history.push("/login");
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