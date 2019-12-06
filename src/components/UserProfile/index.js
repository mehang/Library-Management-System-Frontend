import React from 'react';
import UserForm from "../UserForm";
import {APIUrls} from "../../constants/urls";
import {EMPTY_STRING, msgType, TOKEN_KEY, USER_TYPE, userType} from "../../constants/constants";
import {isNumber, showErrorModal, showSuccessModal} from "../../utils/utils";

const UserProfile = props => {
    const updateUser = (username, password1, password2, name, email, phoneNumber) => {
        let data = {
            method: 'PUT',
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
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        };
        let fetchUrl = EMPTY_STRING;
        if (localStorage.getItem(USER_TYPE)===userType.LIBRARIAN){
            fetchUrl = APIUrls.Librarian;
        } else if (localStorage.getItem(USER_TYPE)===userType.STUDENT){
            fetchUrl = APIUrls.Student;
        } else {
            fetchUrl = APIUrls.Admin;
        }
        fetch(fetchUrl, data)
            .then(res => res.json())
            .then(data => {
                if (isNumber(data.status) && data.status !== 200) {
                    throw new Error(data.message);
                }
                this.setState({statusMsgType: msgType.SUCCESS, statusMsg: "Registered successfully."});
                showSuccessModal("Updated Successfully", "The profile has been updated successfully.");
                return true;
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
                showErrorModal("Error", error.toString());
                return false;
            });
    };

    const clearStatus = () => {
        this.setState({statusMsgType: msgType.SUCCESS, statusMsg: EMPTY_STRING});
    };

    return (
        <UserForm submitUser={updateUser} clearStatus={clearStatus} />
    )
};

export default UserProfile;