import React, {Component, Fragment} from 'react';

import {APIUrls} from "../../constants/urls";
import LayoutWrapper from "../LayoutWrapper";
import {EMPTY_STRING, msgType, userType} from "../../constants/constants";
import UserForm from "../UserForm";
import LibrarianTable from "./LibrarianTable";
import {isLoggedIn, showErrorModal, showSuccessModal} from "../../utils/utils";
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
        await fetch(`${APIUrls.Librarian}`)
            .then(res => {
                const data = res.json();
                if (res.ok) {
                    return data;
                } else {
                    throw new Error(data.message);
                }
            })
            .then(data => {
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
            }
        };
        fetch(APIUrls.Librarian, data)
            .then(res => {
                const data = res.json();
                if (res.ok) {
                    return data;
                } else {
                    throw new Error(data.message);
                }
            })
            .then(data => {
                this.fetchLibrarians();
                this.setState({statusMsgType: msgType.SUCCESS, statusMsg: "Saved successfully."});
                showSuccessModal("Registered Successfully","The librarian has been registered successfully.");
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
            },
        };
        fetch(APIUrls.Librarian+id, data)
            .then(res => {
                if (res.ok) {
                    this.fetchLibrarians();
                    showSuccessModal("Deleted Successfully","The librarian has been successfully,");
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