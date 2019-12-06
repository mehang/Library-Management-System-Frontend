import React, {Component} from 'react';
import LayoutWrapper from "../../LayoutWrapper";
import {APIUrls} from "../../../constants/urls";
import {TOKEN_KEY, USER_ID} from "../../../constants/constants";
import {isEmpty, isNumber, showErrorModal, showSuccessModal} from "../../../utils/utils";
import PasswordChangeForm from "../PasswordChangeForm";
import {Redirect} from "react-router-dom";

class PasswordChangePage extends Component {
    changePassword = (password1, password2) => {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'id': localStorage.getItem(USER_ID),
                'password1': password1,
                'password2': password2,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        };
        fetch(APIUrls.ChangePassword, data)
            .then(res=>{
                console.log(res);
                if (res.status===200){
                    return res;
                } else {
                    return res.json();
                }
            })
            .then(data => {
                console.log(data);
                if (isNumber(data.status) && data.status !== 200) {
                    throw new Error(data.message);
                }
                    showSuccessModal("Password Changed", "Password has been changed successfully.")
            })
            .catch(error => {
                showErrorModal("Error", error.toString());
            });
    };

    render() {
        if (isEmpty(localStorage.getItem(USER_ID))){
            return <Redirect to="/unauthorized"/>
        }
        return (
            <PasswordChangeForm onSubmit={this.changePassword} header="Change Password"/>
        );
    }
}

const WrappedPasswordChangePage = LayoutWrapper(PasswordChangePage);
export default WrappedPasswordChangePage;