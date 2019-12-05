import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import {Button, Divider, Modal, Table, Tag} from 'antd';
import {EMPTY_STRING, msgType, USER_ID} from "../../../constants/constants";
import {APIUrls} from "../../../constants/urls";

class BookTable extends Component {
    constructor(props){
        super(props);
        this.state ={
            serialNumber: EMPTY_STRING,
            errorMsg: EMPTY_STRING,
            modalVisible: false,
        }
    }

    addBook = (isbn) => {
        const librarianID = localStorage.getItem(USER_ID);
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'isbn': isbn,
                'userId': librarianID,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(`${APIUrls.Book}increase/`, data)
            .then(res => {
                const data = res.json();
                if (res.ok) {
                    return data;
                } else {
                    throw new Error(data.message)
                }
            })
            .then(data => {
                this.setState({modalVisible:true,serialNumber: data.serialNo, statusMsgType: msgType.SUCCESS, statusMsg: "Saved successfully."});
            })
            .catch(error => {
                this.setState({modalVisible:true,statusMsgType: msgType.ERROR, statusMsg: error.toString()});
            });
    };

    render() {
        const {selectBook, deleteBook, books} = this.props;
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
            {
                title: 'Action',
                key: 'action',
                render: (text, book) => (
                    <span>
                        <Button type="primary" onClick={() => selectBook(book)}>Edit</Button>
                        <Divider type="vertical"/>
                        <Button type="danger" onClick={() => this.addBook(book.isbn)}>Add</Button>
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
                isbn: book.isbn,
                author: book.author,
                categories: book.bookCategorySet
            })
        });

        return (
            <Fragment>
            <Modal
                centered
                visible={this.state.modalVisible}
                title="SUCCESS"
                onOk={() => this.setState({modalVisible: false, serialNumber:EMPTY_STRING, errorMsg:EMPTY_STRING})}
                footer={[
                    <Button key="submit" type="primary" onClick={() => this.setState({modalVisible: false})}>
                        OK
                    </Button>,
                ]}
            >
                {this.state.serialNumber?
                <p>Book with serial number <span style={{fontWeight: "bold", textDecoration: "underline", color:"#7cb305",fontSize:"large"}}>
                    {this.state.serialNumber}</span> has been added.</p>:
                    <p>Error while adding book. Please try again later.</p>
                }
            </Modal>
            <Table style={{marginTop:"1rem"}} columns={columns} dataSource={booksData}/>
            </Fragment>
        );
    }
}

BookTable.propTypes = {
    books: PropTypes.array.isRequired,
    selectBook: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired
};

export default BookTable;