import React, {Component, Fragment} from 'react';

import {APIUrls} from "../../constants/urls";
import LayoutWrapper from "../LayoutWrapper";
import {EMPTY_STRING,msgType} from "../../constants/constants";
import AuthorForm from "./AuthorForm";
import AuthorTable from "./AuthorTable";
import {isEmpty} from "../../utils/utils";

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
        this.fetchAuthors();
    }

    fetchAuthors = () => {
        fetch(`${APIUrls.Author}`)
            .then(res => {
                if (res.ok){
                    return res.json();
                } else {
                    throw new Error("Error while fetching authors");
                }
            })
            .then(data => {
                this.setState({authors: data, statusMsgType: msgType.SUCCESS});
            })
            .catch(error => {
                this.setState({statusMsgType:msgType.ERROR, statusMsg: error.toString()});
            });
    };

    registerAuthor = () => {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'name': this.state.name,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.Author, data)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Problem in network connectivity.")
                }
            })
            .then(data => {
                this.fetchAuthors();
                this.setState({name: EMPTY_STRING, statusMsgType: msgType.SUCCESS, statusMsg: "Saved successfully."});
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
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
            }
        };
        fetch(APIUrls.Author+authorID, data)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Problem in network connectivity");
                }
            })
            .then(data => {
                this.fetchAuthors();
                this.setState({name: EMPTY_STRING, statusMsgType: msgType.SUCCESS,
                    statusMsg: "Updated successfully.", selectedAuthor: {}});
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
            });
    };


    deleteAuthor = (id) => {
        let data = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch(APIUrls.Author+id, data)
            .then(res => {
                console.log(res);
                if (res.ok) {
                    this.fetchAuthors();
                } else {
                    throw new Error("Error while deleting author.");
                }
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
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
                    deleteAuthor={this.deleteAuthor}
                />
            </Fragment>
        )
    }
}

const WrappedAuthorPage = LayoutWrapper(AuthorPage);
export default WrappedAuthorPage;