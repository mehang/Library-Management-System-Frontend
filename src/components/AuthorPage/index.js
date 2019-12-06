import React, {Component, Fragment} from 'react';

import {APIUrls} from "../../constants/urls";
import LayoutWrapper from "../LayoutWrapper";
import {EMPTY_STRING, msgType, TOKEN_KEY, userType} from "../../constants/constants";
import AuthorForm from "./AuthorForm";
import AuthorTable from "./AuthorTable";
import {isEmpty, isLoggedIn, isNumber, showErrorModal, showSuccessModal} from "../../utils/utils";
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
                if (isNumber(data.status) && data.status !== 200) {
                    throw new Error(data.message);
                }
                this.setState({authors: data, statusMsgType: msgType.SUCCESS});
            })
            .catch(error => {
                this.setState({statusMsgType:msgType.ERROR, statusMsg: error.toString()});
                showErrorModal('Error', "Error while loading authors.");
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
            .then(res => res.json())
            .then(data => {
                if (isNumber(data.status) && data.status !== 200) {
                    throw new Error(data.message);
                }
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
            .then(res => res.json())
            .then(data => {
                if (isNumber(data.status) && data.status !== 200) {
                    throw new Error(data.message);
                }
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