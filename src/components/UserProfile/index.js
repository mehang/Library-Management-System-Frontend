import React from 'react';
import UserForm from "../UserForm";
import {APIUrls} from "../../constants/urls";
import {EMPTY_STRING, msgType} from "../../constants/constants";

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
            }
        };
        //TODO: Also use check condition for librarian and admin
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
                return true;
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
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