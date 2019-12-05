import React, {Component, Fragment} from 'react';

import {APIUrls} from "../../constants/urls";
import LayoutWrapper from "../LayoutWrapper";
import {EMPTY_STRING, msgType, TOKEN_KEY, USER_ID, userType} from "../../constants/constants";
import UserForm from "../UserForm";
import AdminTable from "./AdminTable";
import {isLoggedIn, showErrorModal, showSuccessModal} from "../../utils/utils";
import {Redirect} from "react-router-dom";

export class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusMsgType: msgType.SUCCESS,
            statusMsg: EMPTY_STRING,
            admins: [],
        }
    }

    componentDidMount() {
        this.fetchAdmins();
    }

    fetchAdmins = async () => {
        let data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            },
        };
        await fetch(`${APIUrls.Admin}`, data)
            .then(res => {
                const data = res.json();
                if (res.ok) {
                    return data;
                } else {
                    throw new Error(data.message);
                }
            })
            .then(data => {
                const loggedInAdminID = localStorage.getItem(USER_ID);
                const filteredAdmins = data.filter(admin => loggedInAdminID!==admin.id);
                this.setState({admins: filteredAdmins, statusMsgType: msgType.SUCCESS});
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
                showErrorModal("Error", error.toString());
            });
    };

    registerAdmin = (username, password1, password2, name, email, phoneNumber) => {
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
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        };
        fetch(APIUrls.Admin, data)
            .then(res => {
                const data = res.json();
                if (res.ok) {
                    return data;
                } else {
                    throw new Error(data.message);
                }
            })
            .then(data => {
                this.fetchAdmins();
                this.setState({statusMsgType: msgType.SUCCESS, statusMsg: "Saved successfully."});
                showSuccessModal("Saved Successfully","The admin has been registered successfully.");
                return true;
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
                showErrorModal("Error", error.toString());
                return false;
            });
    };

    deleteAdmin = (id) => {
        let data = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            },
        };
        fetch(APIUrls.Admin+id, data)
            .then(res => {
                if (res.ok) {
                    this.fetchAdmins();
                    showSuccessModal("Deleted Successfully","The admin has been successfully,");
                } else {
                    const data = res.json();
                    throw new Error(data.message);
                }
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
                showErrorModal("Error", error.toString());
            });
    };

    clearStatus = () => {
        this.setState({statusMsgType: msgType.SUCCESS, statusMsg: EMPTY_STRING});
    };

    render() {
        const {statusMsg, admins} = this.state;
        const statusClassName = this.state.statusMsgType === msgType.ERROR ? 'error-status' : 'success-status';
        if (!isLoggedIn(userType.ADMIN)){
            return <Redirect to="/unauthorized"/>
        }
        return (
            <Fragment>
                <div style={{fontWeight:'bold', fontSize:'x-large', marginBottom:'12px'}}>Admin Form</div>
                <UserForm
                    submitUser={this.registerAdmin}
                    clearStatus={this.clearStatus}
                />
                {statusMsg && <div className={statusClassName}>{statusMsg}</div>}
                <AdminTable
                    admins={admins}
                    deleteAdmin={this.deleteAdmin}
                />
            </Fragment>
        )
    }
}

const WrappedAdminPage = LayoutWrapper(AdminPage);
export default WrappedAdminPage;