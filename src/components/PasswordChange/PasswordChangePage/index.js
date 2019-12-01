import React, {Component} from 'react';
import LayoutWrapper from "../../LayoutWrapper";
import {APIUrls} from "../../../constants/urls";
import { USER_ID, USER_TYPE} from "../../../constants/constants";
import {showErrorModal, showSuccessModal} from "../../../utils/utils";
import PasswordChangeForm from "../PasswordChangeForm";

class PasswordChangePage extends Component {
    changePassword = (password1, password2) => {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'id': localStorage.getItem(USER_ID),
                'userType': localStorage.getItem(USER_TYPE),
                'password1': password1,
                'password2': password2,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.ChangePassword, data)
            .then(res => {
                if (res.ok) {
                    showSuccessModal("Password Changed", "Password has been changed successfully.")
                } else {
                    throw new Error("Problem in network connectivity.")
                }
            })
            .catch(error => {
                showErrorModal("Error", "Error while changing the password.");
            });
    };

    render() {
        return (
            <PasswordChangeForm onSubmit={this.changePassword} header="Change Password"/>
        );
    }
}

const WrappedPasswordChangePage = LayoutWrapper(PasswordChangePage);
export default WrappedPasswordChangePage;