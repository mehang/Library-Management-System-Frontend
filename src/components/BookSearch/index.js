import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {Input, Table,Button, Tag} from 'antd';
import SockJS from 'sockjs-client';
import Stomp from 'stomp-websocket';

import {EMPTY_STRING} from "../../constants/constants";
import {APIUrls} from "../../constants/urls";
import LayoutWrapper from "../LayoutWrapper";
import {isNumber, showErrorModal} from "../../utils/utils";

const {Search} = Input;

export class BookSearch extends Component {

    constructor(props) {
        super(props);
        this.stompClient = null;
        this.state = {
            searchKeyword: EMPTY_STRING,
            books: [],
            error: EMPTY_STRING,
        }
    }

    componentDidMount() {
        this.connect();
    }


    connect = () => {
        const socket = new SockJS('http://localhost:8080/websocket');
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, frame => {
            console.log('connected:'+frame);
            this.stompClient.subscribe('/lms/requested', frame => {
                const requestedBookId = JSON.parse(frame.body);
                let books = this.state.books;
                const updatedBooks = books.map(book => ({
                  ...book,
                  bookIds: Array.isArray(book.bookIds)?book.bookIds.filter(bookId => (bookId!==requestedBookId)):[],
                }));
                this.setState({books:updatedBooks});
            });
            this.stompClient.subscribe('/lms/returned', frame => {
                const returnedBook = JSON.parse(frame.body);
                let books = this.state.books;
                const updatedBooks = books.map(book => {
                    return ({
                    ...book,
                    bookIds: ((book.id===returnedBook.specification.id)?[...book.bookIds, returnedBook.id]:book.bookIds),
                })});
                this.setState({books:updatedBooks});
            });
        })
    };

    searchBook = () => {
        let fetchUrl = new URL(APIUrls.BookSearch);
        fetchUrl.searchParams.append('q',this.state.searchKeyword);
        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                if (isNumber(data.status) && data.status !== 200) {
                    throw new Error(data.message);
                }
                this.setState({books: data, error: EMPTY_STRING});
            })
            .catch(error => {
                this.setState({error: error});
                showErrorModal("Error", error.toString());
            });
    };

    render() {
        const {searchKeyword, books, error} = this.state;

        let columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                render: title => <div>{title}</div>
            },
            {
                title: 'Status',
                dataIndex: 'bookIds',
                key: 'bookIds',
                render: bookIds => <div>{bookIds.length!==0?"AVAILABLE": "NOT AVAILABLE"}</div>
            },
            {
                title: 'Publication',
                dataIndex: 'publication',
                key: 'publication',
                render: publication => <div>{publication}</div>
            },
            {
                title: 'Edition',
                dataIndex: 'edition',
                key: 'edition',
                render: edition => <div>{edition}</div>
            },
            {
                title: 'Language',
                dataIndex: 'language',
                key: 'language',
                render: language => <div>{language}</div>
            },
            {
                title: 'ISBN',
                dataIndex: 'isbn',
                key: 'isbn',
                render: isbn => <div>{isbn}</div>
            },
            {
                title: 'Author',
                dataIndex: 'author',
                key: 'author',
                render: author => <div>{author.name}</div>
            },
            {
                title: 'Categories',
                dataIndex: 'categories',
                key: 'categories',
                render: categories => (<span>
          {categories.map(category => (
              <Tag color="blue" key={category.id}>
                  {category.name}
              </Tag>
          ))}
        </span>)
            },
        ];

        if (this.props.allowRequest){
            columns.push({
                title: 'Action',
                key: 'action',
                render: (text, book) => (
                    <span>
                        {book.bookIds.length !== 0 && <Button type="primary" onClick={() => this.props.requestBook(book.bookIds[0])}>Request</Button>}
                    </span>
                )
            });
        }

        const booksData = books.map(book => {
            return ({
                key: book.id,
                title: book.name,
                isbn: book.isbn,
                edition: book.edition,
                publication: book.publication,
                language: book.language,
                author: book.author,
                categories: book.bookCategorySet,
                bookIds: book.bookIds
            });
        });


        return (
            <div>
                <Search
                    value={searchKeyword}
                    onChange={e => this.setState({searchKeyword: e.target.value})}
                    placeholder="Book title"
                    onSearch={value => this.searchBook(value)}
                    style={{width:"30%"}}
                    enterButton/>
                {error && <div className="error-status">{error}</div>}
                <Table style={{marginTop:"1rem", height:"100%"}} columns={columns} dataSource={booksData} />
            </div>
        );
    }
}

BookSearch.propTypes = {
    requestBook: PropTypes.func,
    allowRequest: PropTypes.bool,
};

const WrappedBookSearch = LayoutWrapper(BookSearch);
export default WrappedBookSearch;