import React, {Component, Fragment} from 'react';

import {APIUrls} from "../../constants/urls";
import LayoutWrapper from "../LayoutWrapper";
import {EMPTY_STRING, msgType, userType} from "../../constants/constants";
import UserForm from "../UserForm";
import AdminTable from "./AdminTable";
import {isLoggedIn} from "../../utils/utils";
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
        await fetch(`${APIUrls.Admin}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Error while fetching admins.");
                }
            })
            .then(data => {
                this.setState({admins: data, statusMsgType: msgType.SUCCESS});
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
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
            }
        };
        fetch(APIUrls.Admin, data)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Problem in network connectivity.")
                }
            })
            .then(data => {
                this.fetchAdmins();
                this.setState({statusMsgType: msgType.SUCCESS, statusMsg: "Saved successfully."});
                return true;
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
                return false;
            });
    };

    deleteAdmin = (id) => {
        let data = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch(`${APIUrls.Admin}delete/${id}`, data)
            .then(res => {
                if (res.ok) {
                    this.fetchAdmins();
                } else {
                    throw new Error("Error while deleting admin.");
                }
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
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