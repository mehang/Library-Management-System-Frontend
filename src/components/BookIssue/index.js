import React, {Component, Fragment} from 'react';
import {Button, Input, Modal, Select, Table, Tag} from "antd";
import LayoutWrapper from "../LayoutWrapper";
import {msgType, USER_ID, userType} from "../../constants/constants";
import {APIUrls} from "../../constants/urls";
import moment from "moment";
import {isLoggedIn, showErrorModal, showSuccessModal} from "../../utils/utils";
import {Redirect} from "react-router-dom";

const {Option} = Select;

class BookIssue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestedBooks: [],
            students: [],
        }
    }

    componentDidMount() {
        this.fetchStudents();
    }

    fetchStudents = () => {
        fetch(`${APIUrls.Student}`)
            .then(res => {
                const data = res.json();
                if (res.ok) {
                    return data;
                } else {
                    throw new Error(data.message);
                }
            })
            .then(data => {
                console.log(data);
                this.setState({students: data});
            })
            .catch(error => {
                showErrorModal("Error", error.toString());
            });
    };

    fetchRequestedBooks = (username) => {
        const data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(`${APIUrls.User+username}/bookloans`, data)
            .then(res => {
                const data = res.json();
                if (res.ok) {
                    return data;
                } else {
                    throw new Error(data.message)
                }
            })
            .then(data => {
                this.setState({requestedBooks: data.filter(requestedBook => requestedBook.status === "REQUESTED")});
            })
            .catch(error => {
                showErrorModal("Error", error.toString());
            });
    };

    issueBook = id => {
        const librarianID = localStorage.getItem(USER_ID);
        const data = {
            method: 'POST',
            body: JSON.stringify({
                'bookId': id,
                'userId': librarianID,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.BookIssue, data)
            .then(res => {
                const data = res.json();
                if (res.ok) {
                    return data;
                } else {
                    throw new Error(data.message);
                }
            })
            .then(data => {
                showSuccessModal("Issued Successfully", "The book has been issued successfully.");
            })
            .catch(error => {
                showErrorModal("Error", error.toString());
            });
    };
    render(){
        if (!isLoggedIn(userType.LIBRARIAN)){
            return <Redirect to="/unauthorized"/>
        }
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
                title: 'Date Of Request',
                dataIndex: 'dateOfRequest',
                key: 'dateOfRequest',
                render: dateOfRequest => <div>{dateOfRequest}</div>
            },
            {
                title: 'Date Of Return',
                dataIndex: 'dateOfReturn',
                key: 'dateOfReturn',
                render: dateOfReturn => <div>{dateOfReturn}</div>
            },
            {
                title: 'Edition',
                dataIndex: 'edition',
                key: 'edition',
                render: edition => <div>{edition}</div>
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
                        <Button type="primary" onClick={() => this.issueBook(book.bookID)}>Issue</Button>
                    </span>
                )
            }
        ];

        const booksData = this.state.requestedBooks.map(requestedBook => {
            return ({
                key: requestedBook.id,
                bookID: requestedBook.book.id,
                serialNumber: requestedBook.book.serialNo,
                title: requestedBook.book.specification.name,
                dateOfRequest: moment(requestedBook.dateOfRequest).format("YYYY-MM-DD"),
                dateOfReturn: moment(requestedBook.dateOfReturn).format("YYYY-MM-DD"),
                isbn: requestedBook.book.specification.isbn,
                edition: requestedBook.book.specification.edition,
                author: requestedBook.book.specification.author,
                categories: requestedBook.book.specification.bookCategorySet
            });
        });

        return (
            <Fragment>
                <Select
                    showSearch
                    style={{width:"30%"}}
                    placeholder="Select username"
                    optionFilterProp="children"
                    onSelect={this.fetchRequestedBooks}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.state.students.map(student =>
                        <Option key={student.id} value={student.username}>
                            {student.username}
                        </Option>)}
                </Select>
                <Table style={{marginTop:"1rem"}} columns={columns} dataSource={booksData} />
            </Fragment>
        );
    }
}

const WrappedBookIssue = LayoutWrapper(BookIssue);
export default WrappedBookIssue;