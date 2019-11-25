import React, {Component, Fragment} from 'react';

import PropTypes from 'prop-types';
import {Input, Table, Tag} from 'antd';

import {EMPTY_STRING, msgType} from "../../constants/constants";
import {APIUrls} from "../../constants/urls";

const {Search} = Input;

class BookSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: EMPTY_STRING,
            books: [],
            error: EMPTY_STRING,
        }
    }

    searchBook = searchKeyword => {
        let url = new URL(APIUrls.BookSearch);
        const params = {searchKeyword: this.state.searchKeyword};
        url.searchParams = new URLSearchParams(params).toString();
        fetch(url)
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
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                render: title => <div>{title}</div>
            },
            {
                title: 'Author',
                dataIndex: 'author',
                key: 'author',
                render: author => <Tag>{author}</Tag>
            },
        ];

        if (this.props.allowRequest){
            columns.push({
                title: 'Action',
                key: 'action',
                render: (text, librarian) => (
                    <span>
                        <a onClick={() => this.requestBook(librarian.key)}>Request</a>
                    </span>
                )
            });
        }

        const booksData = books.map(book => {
            return ({
                key: book.id,
                title: book.title,
                author: book.author.name,
            });
        });


        return (
            <div>
                <Search
                    value={searchKeyword}
                    onChange={e => this.setState({searchKeyword: e.target.value})}
                    placeholder="Book title"
                    onSearch={value => console.log(value)}

                    enterButton/>
                {error && <div className="error-status">{error}</div>}
                <Table columns={columns} dataSource={booksData} />

            </div>
        );
    }
}

BookSearch.propTypes = {
    allowRequest: PropTypes.bool.isRequired,
}

export default BookSearch;
