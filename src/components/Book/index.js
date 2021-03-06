import React, {Component, Fragment} from 'react';

import { Modal } from 'antd';

import {APIUrls} from "../../constants/urls";
import LayoutWrapper from "../LayoutWrapper";
import {EMPTY_STRING, msgType, TOKEN_KEY, USER_ID, userType} from "../../constants/constants";
import BookForm from "./BookForm";
import BookTable from "./BookTable";
import {isEmpty, isLoggedIn, isNumber, showErrorModal, showSuccessModal} from "../../utils/utils";
import {fetchAuthors} from "../../common/fetches";
import {Redirect} from "react-router-dom";


export class BookPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            name: EMPTY_STRING,
            publication: EMPTY_STRING,
            edition: EMPTY_STRING,
            language: EMPTY_STRING,
            isbn: EMPTY_STRING,
            selectedAuthorID: null,
            selectedCategoriesID: [],
            selectedBook: {},
            books:[],
            authors: [],
            categories: [],
            statusMsgType: msgType.SUCCESS,
            statusMsg: EMPTY_STRING,
        }
    }

    componentDidMount(){
        this.fetchBooks()
            .then(() => fetchAuthors()
                    .then(data => {
                        this.setState({authors: data, statusMsgType: msgType.SUCCESS});
                    })
                .then(() => this.fetchCategories())
                .catch(error => {
                    this.setState({statusMsgType:msgType.ERROR, statusMsg: error.toString()});
                    showErrorModal('Error', error.toString());
                })
            );
    }


    clearInputs = () => this.setState({
        name: EMPTY_STRING,
        publication: EMPTY_STRING,
        edition: EMPTY_STRING,
        language: EMPTY_STRING,
        isbn: EMPTY_STRING,
        selectedAuthorID: null,
        selectedCategoriesID: [],
    });

    fetchBooks = async () => {
        let data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            },
        };
        await fetch(`${APIUrls.BookSpecs}`, data)
            .then(res => res.json())
            .then(data => {
                if (isNumber(data.status) && data.status !== 200) {
                    throw new Error(data.message);
                }
                this.setState({books: data, statusMsgType: msgType.SUCCESS});
            })
            .catch(error => {
                this.setState({statusMsgType:msgType.ERROR, statusMsg: error.toString()});
            });
    };

    fetchCategories = () => {
        let data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            },
        };
        fetch(`${APIUrls.BookCategory}`, data)
            .then(res => res.json())
            .then(data => {
                if (isNumber(data.status) && data.status !== 200) {
                    throw new Error(data.message);
                }
                this.setState({categories: data, statusMsgType: msgType.SUCCESS});
            })
            .catch(error => {
                this.setState({statusMsgType:msgType.ERROR, statusMsg: error.toString()});
            });
    };

    registerBook = () => {
        const librarianID = localStorage.getItem(USER_ID);
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'name': this.state.name,
                'publication': this.state.publication,
                'language': this.state.language,
                'edition': this.state.edition,
                'isbn': this.state.isbn,
                'librarianId': librarianID,
                'authorId': this.state.selectedAuthorID,
                'bookCategory': this.state.selectedCategoriesID,

            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        };
        fetch(APIUrls.Book, data)
            .then(res => res.json())
            .then(data => {
                if (isNumber(data.status) && data.status !== 200) {
                    throw new Error(data.message);
                }
                this.onBookAddition(data.serialNo);
                this.fetchBooks();
                this.setState({statusMsgType: msgType.SUCCESS, statusMsg: "Saved successfully."});
                showSuccessModal("Saved successfully","The book has been registered successfully.", this.clearInputs);
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
                showErrorModal("Error", error.toString());
            });
    };

    updateBook = () => {
        const librarianID = localStorage.getItem(USER_ID);
        const bookID = this.state.selectedBook.key;
        let data = {
            method: 'PUT',
            body: JSON.stringify({
                'bookId': bookID,
                'name': this.state.name,
                'publication': this.state.publication,
                'language': this.state.language,
                'edition': this.state.edition,
                'isbn': this.state.isbn,
                'librarianId': librarianID,
                'authorId': this.state.selectedAuthorID,
                'bookCategory': this.state.selectedCategoriesID,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        };
        fetch(APIUrls.Book + bookID, data)
            .then(res => res.json())
            .then(data => {
                if (isNumber(data.status) && data.status !== 200) {
                    throw new Error(data.message);
                }
                this.fetchBooks();
                this.setState({name: EMPTY_STRING, statusMsgType: msgType.SUCCESS,
                    statusMsg: "Updated successfully.", selectedBook: {}});
                showSuccessModal("Updated successfully","The book has been updated successfully.", this.clearInputs);
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
                showErrorModal("Error", error.toString());
            });
    };


    deleteBook = (id) => {
        let data = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            },
        };
        fetch(`${APIUrls.BookSpecs}delete/${id}`, data)
            .then(res => res.json())
            .then(data => {
                if (isNumber(data.status) && data.status !== 200) {
                    throw new Error(data.message);
                }
                    this.fetchBooks();
                    showSuccessModal("Deleted successfully","The book has been deleted successfully.");
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
                showErrorModal("Error", error.toString());
            });
    };

    onNameChange = name => this.setState({name});

    onPublicationChange = publication => this.setState({publication});

    onEditionChange = edition => this.setState({edition});

    onLanguageChange = language => this.setState({language});

    onIsbnChange = isbn => this.setState({isbn});

    selectBook = book => {
        const selectedCategoriesID = book.categories.map(category => category.id);
        this.setState({selectedBook: book, selectedAuthorID:book.author.id, selectedCategoriesID: selectedCategoriesID,...book});
    };

    onAuthorChange = authorID => this.setState({selectedAuthorID:authorID});

    onCategoriesChange = categoriesID => this.setState({selectedCategoriesID:categoriesID});

    clearStatus = () => {
        this.setState({statusMsgType: msgType.SUCCESS, statusMsg: EMPTY_STRING});
    };

    onSubmit = () => {
        if (isEmpty(this.state.selectedBook)){
            this.registerBook();
        } else {
            this.updateBook();
        }
    };

    onBookAddition = (serialNumber) => {
        Modal.success({
            title: 'New Book Added',
            content: (
                <div>
                    <p>A book has been successfully created for the given description and
                        a serial number <span style={{fontWeight: "bold", textDecoration: "underline", color:"#7cb305",fontSize:"large"}}>
                            {serialNumber}</span> has been generated for it.</p>
                </div>
            ),
            onOk() {},
        });
    };

    render() {
        const {name,publication, edition, language, isbn,selectedAuthorID, selectedCategoriesID,
            authors, categories, statusMsg, books} = this.state;
        const statusClassName = this.state.statusMsgType === msgType.ERROR ? 'error-status' : 'success-status';
        if (!isLoggedIn(userType.LIBRARIAN)){
            return <Redirect to="/unauthorized"/>
        }
        return (
            <Fragment>
                <BookForm
                    name={name}
                    publication={publication}
                    edition={edition}
                    language={language}
                    isbn={isbn}
                    authors={authors}
                    selectedAuthorID={selectedAuthorID}
                    categories={categories}
                    selectedCategoriesID={selectedCategoriesID}
                    onNameChange={this.onNameChange}
                    onPublicationChange={this.onPublicationChange}
                    onEditionChange={this.onEditionChange}
                    onLanguageChange={this.onLanguageChange}
                    onIsbnChange={this.onIsbnChange}
                    onAuthorChange={this.onAuthorChange}
                    onCategoriesChange={this.onCategoriesChange}
                    onSubmit={this.onSubmit}
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