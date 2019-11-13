import React, {Component, Fragment} from 'react';

import {APIUrls} from "../../constants/urls";
import LayoutWrapper from "../LayoutWrapper";
import {EMPTY_STRING, msgType} from "../../constants/constants";
import UserForm from "../UserForm";
import LibrarianTable from "./LibrarianTable";

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
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Error while fetching librarians.");
                }
            })
            .then(data => {
                this.setState({librarians: data, statusMsgType: msgType.SUCCESS});
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
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
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Problem in network connectivity.")
                }
            })
            .then(data => {
                this.fetchLibrarians();
                this.setState({statusMsgType: msgType.SUCCESS, statusMsg: "Saved successfully."});
                return true;
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
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
        fetch(`${APIUrls.Librarian}delete/${id}`, data)
            .then(res => {
                if (res.ok) {
                    this.fetchLibrarians();
                } else {
                    throw new Error("Error while deleting librarian.");
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
        const {statusMsg, librarians} = this.state;
        const statusClassName = this.state.statusMsgType === msgType.ERROR ? 'error-status' : 'success-status';

        return (
            <Fragment>
                <UserForm
                    registerUser={this.registerLibrarian}
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