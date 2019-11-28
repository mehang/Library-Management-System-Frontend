import React, {Component, Fragment} from 'react';
import {Input, Modal, Select, Table, Tag} from "antd";
import LayoutWrapper from "../LayoutWrapper";
import {msgType, USER_ID} from "../../constants/constants";
import {APIUrls} from "../../constants/urls";
import moment from "moment";

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

    onSuccess = () => {
        Modal.success({
            title: 'Issued Successfully',
            content: (
                <div>
                    <p>The book has been issued successfully.</p>
                </div>
            ),
            onOk() {},
        });
    };

    onError = (errorMsg) => {
        Modal.success({
            title: 'Error',
            content: (
                <div>
                    <p>{errorMsg}</p>
                </div>
            ),
            onOk() {},
        });
    };

    fetchStudents = () => {
        fetch(`${APIUrls.Student}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Error while fetching students.");
                }
            })
            .then(data => {
                console.log(data);
                this.setState({students: data});
            })
            .catch(error => {
                this.onError("Error while fetching students.")
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
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Problem in network connectivity.")
                }
            })
            .then(data => {
                this.setState({requestedBooks: data.filter(requestedBook => requestedBook.status === "REQUESTED")});
            })
            .catch(error => {
                this.onError("Error while fetching requested books for the given user.");
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
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Problem in network connectivity.")
                }
            })
            .then(data => {
                this.onSuccess();
            })
            .catch(error => {
                this.onError("There was an error while issuing the book. Please try again later.");
            });
    };
    render(){

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
                        <a onClick={() => this.issueBook(book.bookID)}>Issue</a>
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