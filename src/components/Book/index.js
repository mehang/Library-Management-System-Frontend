import React, {Component, Fragment} from 'react';

import { Modal } from 'antd';

import {APIUrls} from "../../constants/urls";
import LayoutWrapper from "../LayoutWrapper";
import {EMPTY_STRING, msgType, USER_ID} from "../../constants/constants";
import BookForm from "./BookForm";
import BookTable from "./BookTable";
import {isEmpty} from "../../utils/utils";

const {Info} = Modal;

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
            .then(this.fetchAuthors()
                .then(this.fetchCategories()));
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
        await fetch(`${APIUrls.BookSpecs}`)
            .then(res => {
                if (res.ok){
                    return res.json();
                } else {
                    throw new Error("Error while fetching books.");
                }
            })
            .then(data => {
                this.setState({books: data, statusMsgType: msgType.SUCCESS});
            })
            .catch(error => {
                this.setState({statusMsgType:msgType.ERROR, statusMsg: error.toString()});
            });
    };

    fetchAuthors = async () => {
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

    fetchCategories = () => {
        fetch(`${APIUrls.BookCategory}`)
            .then(res => {
                if (res.ok){
                    return res.json();
                } else {
                    throw new Error("Error while fetching categories");
                }
            })
            .then(data => {
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
            }
        };
        fetch(APIUrls.Book, data)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Problem in network connectivity.")
                }
            })
            .then(data => {
                this.onBookAddition(data.serialNo);
                this.fetchBooks();
                this.clearInputs();
                this.setState({statusMsgType: msgType.SUCCESS, statusMsg: "Saved successfully."});
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
            });
    };

    updateBook = () => {
        const librarianID = localStorage.getItem(USER_ID);
        const bookID = this.state.selectedBook.key;
        let data = {
            method: 'PUT',
            body: JSON.stringify({
                'id': bookID,
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
            }
        };
        fetch(APIUrls.Book + bookID, data)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Problem in network connectivity");
                }
            })
            .then(data => {
                this.fetchBooks();
                this.clearInputs();
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