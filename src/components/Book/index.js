import React, {Component, Fragment} from 'react';

import {APIUrls} from "../../constants/urls";
import LayoutWrapper from "../LayoutWrapper";
import {EMPTY_STRING,msgType} from "../../constants/constants";
import BookForm from "./BookForm";
import BookTable from "./BookTable";

export class BookPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            name: EMPTY_STRING,
            publication: EMPTY_STRING,
            edition: EMPTY_STRING,
            language: EMPTY_STRING,
            isbn: EMPTY_STRING,
            statusMsgType: msgType.SUCCESS,
            statusMsg: EMPTY_STRING,
            selectedBook: {},
            books:[],

        }
    }

    componentDidMount(){
        this.fetchBooks();
    }

    fetchBooks = async () => {
        await fetch(`${APIUrls.BookSpecs}`)
            .then(res => {
                if (res.ok){
                    return res.json();
                } else {
                    throw new Error("Error while fetching books.");
                }
            })
            .then(data => {
                this.setState({authors: data, statusMsgType: msgType.SUCCESS});
            })
            .catch(error => {
                this.setState({statusMsgType:msgType.ERROR, statusMsg: error.toString()});
            });
    };

    registerBook = () => {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'name': this.state.name,
                'publication': this.state.publication,
                'language': this.state.language,
                'edition': this.state.edition,
                'isbn': this.state.isbn,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.BookSpecs, data)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Problem in network connectivity.")
                }
            })
            .then(data => {
                this.fetchBooks();
                this.setState({name: EMPTY_STRING, statusMsgType: msgType.SUCCESS, statusMsg: "Saved successfully."});
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
            });
    };

    updateBook = async () => {
        let data = {
            method: 'PUT',
            body: JSON.stringify({
                'id': this.state.selectedBook.id,
                'name': this.state.name,
                'publication': this.state.publication,
                'language': this.state.language,
                'edition': this.state.edition,
                'isbn': this.state.isbn,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.BookSpecs, data)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Problem in network connectivity");
                }
            })
            .then(data => {
                this.fetchBooks();
                this.setState({name: EMPTY_STRING, statusMsgType: msgType.SUCCESS,
                    statusMsg: "Updated successfully.", selectedBook: {}});
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
            });
    };


    deleteBook = (id) => {
        let data = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch(`${APIUrls.BookSpecs}delete/${id}`, data)
            .then(res => {
                if (res.ok) {
                    this.fetchBooks();
                } else {
                    throw new Error("Error while deleting author.");
                }
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
            });
    };

    onNameChange = name => this.setState({name});

    onPublicationChange = publication => this.setState({publication});

    onEditionChange = edition => this.setState({edition});

    onLanguageChange = language => this.setState({language});

    onIsbnChange = isbn => this.setState({isbn});

    selectBook = book => this.setState({selectedBook: book});

    clearStatus = () => {
        this.setState({statusMsgType: msgType.SUCCESS, statusMsg: EMPTY_STRING});
    };

    render() {
        const {name,publication, edition, language, isbn, statusMsg, books} = this.state;
        const statusClassName = this.state.statusMsgType === msgType.ERROR ? 'error-status' : 'success-status';

        return (
            <Fragment>
                <BookForm
                    name={name}
                    publication={publication}
                    edition={edition}
                    language={language}
                    isbn={isbn}
                    onNameChange={this.onNameChange}
                    onPublicationChange={this.onPublicationChange}
                    onEditionChange={this.onEditionChange}
                    onLanguageChange={this.onLanguageChange}
                    onIsbnChange={this.onIsbnChange}
                    registerBook={this.registerBook}
                    updateBook={this.updateBook}
                    clearStatus={this.clearStatus}
                />
                {statusMsg && <div className={statusClassName}>{statusMsg}</div>}
                <BookTable
                    books={books}
                    selectBook={this.selectBook}
                    deleteBook={this.deleteBook}
                />
            </Fragment>
        )
    }
}

const WrappedStudentPage = LayoutWrapper(BookPage);
export default WrappedStudentPage;