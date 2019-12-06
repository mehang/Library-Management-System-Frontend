import React, {Component, Fragment} from 'react';

import {APIUrls} from "../../constants/urls";
import LayoutWrapper from "../LayoutWrapper";
import {EMPTY_STRING, msgType, TOKEN_KEY, userType} from "../../constants/constants";
import UserForm from "../UserForm";
import LibrarianTable from "./LibrarianTable";
import {isLoggedIn, isNumber, showErrorModal, showSuccessModal} from "../../utils/utils";
import {Redirect} from "react-router-dom";

export class LibrarianPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusMsgType: msgType.SUCCESS,
            statusMsg: EMPTY_STRING,
            librarians: [],
        }
    }

    componentDidMount() {
        this.fetchLibrarians();
    }

    fetchLibrarians = async () => {
        let data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            },
        };
        await fetch(`${APIUrls.Librarian}`, data)
            .then(res => res.json())
            .then(data => {
                if (isNumber(data.status) && data.status !== 200) {
                    throw new Error(data.message);
                }
                this.setState({librarians: data, statusMsgType: msgType.SUCCESS});
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
                showErrorModal("Error", error.toString());
            });
    };

    registerLibrarian = (username, password1, password2, name, email, phoneNumber) => {
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
        fetch(APIUrls.Librarian, data)
            .then(res => res.json())
            .then(data => {
                if (isNumber(data.status) && data.status !== 200) {
                    throw new Error(data.message);
                }
                this.fetchLibrarians();
                this.setState({statusMsgType: msgType.SUCCESS, statusMsg: "Saved successfully."});
                showSuccessModal("Saved Successfully","The librarian has been registered successfully.");
                return true;
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
                showErrorModal("Error", error.toString());
                return false;
            });
    };

    deleteLibrarian = (id) => {
        let data = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            },
        };
        fetch(APIUrls.Librarian+id, data)
            .then(res => {
                if (res.ok){
                    this.fetchLibrarians();
                    showSuccessModal("Deleted Successfully","The librarian has been successfully,");
                } else {
                    throw new Error("Problem while deleting librarian.");
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
        const {statusMsg, librarians} = this.state;
        const statusClassName = this.state.statusMsgType === msgType.ERROR ? 'error-status' : 'success-status';

        if (!isLoggedIn(userType.ADMIN)){
            return <Redirect to="/unauthorized" />
        }
        return (
            <Fragment>
                <div style={{fontWeight:'bold', fontSize:'x-large', marginBottom:'12px'}}>Librarian Form</div>
                <UserForm
                    submitUser={this.registerLibrarian}
                    clearStatus={this.clearStatus}
                />
                {statusMsg && <div className={statusClassName}>{statusMsg}</div>}
                <LibrarianTable
                    librarians={librarians}
                    deleteLibrarian={this.deleteLibrarian}
                />
            </Fragment>
        )
    }
}

const WrappedLibrarianPage = LayoutWrapper(LibrarianPage);
export default WrappedLibrarianPage;