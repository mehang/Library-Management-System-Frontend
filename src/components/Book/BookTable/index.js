import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Divider, Table} from 'antd';

const BookTable = props => {

    const {selectBook, deleteBook, books} = props;
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: name => <div>{name}</div>
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
            title: 'Action',
            key: 'action',
            render: (text, book) => (
                <span>
                        <a onClick={() => selectBook(book)}>Edit</a>
                        <Divider type="vertical"/>
                        <a onClick={() => deleteBook(book.key)}>Delete</a>
                    </span>
            )
        },
    ];

    const booksData = books.map(book => {
        return ({
            key: book.id,
            name: book.name,
            publication: book.publication,
            edition: book.edition,
            language: book.language,
            isbn:book.isbn
        })
    });

    return (
        <Table columns={columns} dataSource={booksData}/>
    );
};

BookTable.propTypes = {
    books: PropTypes.array.isRequired,
    selectBook: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired
};

export default BookTable;