import React, {Component, Fragment} from 'react';

import {APIUrls} from "../../constants/urls";
import LayoutWrapper from "../LayoutWrapper";
import {EMPTY_STRING, msgType, TOKEN_KEY, userType} from "../../constants/constants";
import AuthorForm from "./AuthorForm";
import AuthorTable from "./AuthorTable";
import {isEmpty, isLoggedIn, showErrorModal, showSuccessModal} from "../../utils/utils";
import {fetchAuthors} from "../../common/fetches";
import {Redirect} from "react-router-dom";

export class AuthorPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            name: EMPTY_STRING,
            statusMsgType: msgType.SUCCESS,
            statusMsg: EMPTY_STRING,
            selectedAuthor: {},
            authors:[],

        }
    }

    componentDidMount(){
        this.loadAuthors();
    }

    loadAuthors = () => {
        fetchAuthors()
            .then(data => {
                this.setState({authors: data, statusMsgType: msgType.SUCCESS});
            })
            .catch(error => {
                this.setState({statusMsgType:msgType.ERROR, statusMsg: error.toString()});
                showErrorModal('Error', error.toString());
            })
    };

    registerAuthor = () => {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'name': this.state.name,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        };

        fetch(APIUrls.Author, data)
            .then(res => {
                const data = res.json();
                if (res.ok) {
                    return data;
                } else {
                    throw new Error(data.message);
                }
            })
            .then(data => {
                this.loadAuthors();
                this.setState({name: EMPTY_STRING, statusMsgType: msgType.SUCCESS, statusMsg: "Saved successfully."});
                showSuccessModal("Saved successfully","The author has been registered successfully.", this.clearStatus);
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
                showErrorModal("Error",error.toString());
            });
    };

    updateAuthor = async () => {

        const authorID = this.state.selectedAuthor.key;
        let data = {
            method: 'PUT',
            body: JSON.stringify({
                'id': authorID,
                'name': this.state.name,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        };
        fetch(APIUrls.Author+authorID, data)
            .then(res => {
                const data = res.json();
                if (res.ok) {
                    return data;
                } else {
                    throw new Error(data.message);
                }
            })
            .then(data => {
                this.loadAuthors();
                this.setState({name: EMPTY_STRING, statusMsgType: msgType.SUCCESS,
                    statusMsg: "Updated successfully.", selectedAuthor: {}});
                showSuccessModal("Updated successfully","The author has been updated successfully.", this.clearStatus);
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
                showErrorModal("Error", error.toString());
            });
    };


    // deleteAuthor = (id) => {
    //     let data = {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     };
    //     fetch(APIUrls.Author+id, data)
    //         .then(res => {
    //             if (res.ok) {
    //                 this.loadAuthors();
    //                 showSuccessModal("Deleted successfully","The author has been deleted successfully.");
    //             } else {
    //                 throw new Error("Error while deleting author.");
    //             }
    //         })
    //         .catch(error => {
    //             this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
    //             showErrorModal("Error", error.toString());
    //         });
    // };

    onSubmit = () => {
        if (isEmpty(this.state.selectedAuthor)){
            this.registerAuthor();
        } else {
            this.updateAuthor();
        }
    };

    onNameChange = name => this.setState({name});

    selectAuthor = author => this.setState({selectedAuthor: author, name: author.name});

    clearStatus = () => {
        this.setState({statusMsgType: msgType.SUCCESS, statusMsg: EMPTY_STRING});
    };

    render() {
        const {name,statusMsg, authors} = this.state;
        const statusClassName = this.state.statusMsgType === msgType.ERROR ? 'error-status' : 'success-status';
        if (!isLoggedIn(userType.LIBRARIAN)){
            return <Redirect to="/unauthorized"/>
        }
        return (
            <Fragment>
                <AuthorForm
                    name={name}
                    onNameChange={this.onNameChange}
                    onSubmit = {this.onSubmit}
                    clearStatus={this.clearStatus}
                />
                {statusMsg && <div className={statusClassName}>{statusMsg}</div>}
                <AuthorTable
                    authors={authors}
                    selectAuthor={this.selectAuthor}
                    // deleteAuthor={this.deleteAuthor}
                />
            </Fragment>
        )
    }
}

const WrappedAuthorPage = LayoutWrapper(AuthorPage);
export default WrappedAuthorPage;