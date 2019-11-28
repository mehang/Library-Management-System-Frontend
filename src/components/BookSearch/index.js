import React, {Component, Fragment} from 'react';

import PropTypes from 'prop-types';
import {Input, Table, Tag} from 'antd';

import {EMPTY_STRING, msgType} from "../../constants/constants";
import {APIUrls} from "../../constants/urls";
import LayoutWrapper from "../LayoutWrapper";
import {AdminPage} from "../AdminPage";

const {Search} = Input;

export class BookSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: EMPTY_STRING,
            books: [],
            error: EMPTY_STRING,
        }
    }

    searchBook = searchKeyword => {
        let fetchUrl = new URL(APIUrls.BookSearch);
        const params = {searchKeyword: this.state.searchKeyword};
        fetchUrl.searchParams.append('q',this.state.searchKeyword);
        fetch(fetchUrl)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Error while fetching books.");
                }
            })
            .then(data => {
                this.setState({books: data, error: EMPTY_STRING});
            })
            .catch(error => {
                this.setState({error: error});
            });
    };

    requestBook = id => {
        console.log(id);
    };

    render() {
        const {searchKeyword, books, error} = this.state;

        let columns = [
            {
                title: 'Serial Number',
                dataIndex: 'serialNumber',
                key: 'serialNumber',
                render: serialNumber => <div>{serialNumber}</div>
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                render: title => <div>{title}</div>
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: status => <div>{status}</div>
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
                        <a onClick={() => this.requestBook(book.key)}>Request</a>
                    </span>
                )
            });
        }

        const booksData = books.map(book => {
            return ({
                key: book.id,
                serialNumber: book.serialNo,
                status: book.status,
                title: book.specification.name,
                isbn: book.specification.isbn,
                edition: book.specification.edition,
                publication: book.specification.publication,
                language: book.specification.language,
                author: book.specification.author,
                categories: book.specification.bookCategorySet
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
                <Table style={{marginTop:"1rem"}} columns={columns} dataSource={booksData} />
            </div>
        );
    }
}

BookSearch.propTypes = {
    allowRequest: PropTypes.bool,
};

const WrappedBookSearchPage = LayoutWrapper(BookSearch);
export default WrappedBookSearchPage;