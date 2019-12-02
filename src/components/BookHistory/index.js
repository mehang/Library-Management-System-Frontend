import React, {Component, Fragment} from 'react';
import {msgType, USER_ID, userType} from "../../constants/constants";
import {APIUrls} from "../../constants/urls";
import {isLoggedIn, showErrorModal} from "../../utils/utils";
import {Select, Table, Tag} from "antd";
import LayoutWrapper from "../LayoutWrapper";
import moment from "moment";
import {Redirect} from "react-router-dom";

const {Option} = Select;

class BookHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books:[],
            bookLoans:[],
        }
    }

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks = () => {
        fetch(APIUrls.Book)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Error while fetching book history.");
                }
            })
            .then(data => {
                this.setState({books: data});
            })
            .catch(error => {
                showErrorModal('Error', 'Error while fetching books.');
            });
    };

    fetchBookLoanHistory = bookID => {
        fetch(`${APIUrls.Book+bookID}/bookloans`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Error while fetching book history.");
                }
            })
            .then(data => {
                this.setState({bookLoans: data});
            })
            .catch(error => {
                this.setState({bookLoans:[]});
                showErrorModal('Error', 'Error while fetching the history for the book');
            });
    };

    nestedLogTable =(bookLoan) => {
        const columns = [
            {
                title: 'Time Stamp',
                dataIndex: 'timeStamp',
                key: 'timeStamp',
                render: timeStamp => <div>{timeStamp}</div>
            },
            {
                title: 'Action Type',
                dataIndex: 'actionType',
                key: 'actionType',
                render: actionType => <div>{actionType}</div>
            },
        ];

        let logs = bookLoan.log;
        logs.sort((log1, log2)=> log1.id-log2.id);
        const logData = logs.map(log => ({
            key: log.id,
           timeStamp: moment(log.timeStamp).format("YYYY-MM-DD, h:mm a"),
            actionType: log.action
        }));
        return  <Table columns={columns} dataSource={logData} pagination={false}/>
    };

    render(){
        if (!isLoggedIn(userType.LIBRARIAN)){
            return <Redirect to="/unauthorized"/>
        }

        const columns = [
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
                title: 'Author',
                dataIndex: 'author',
                key: 'author',
                render: author => <div>{author}</div>
            },
            {
                title: 'Requested By',
                dataIndex: 'requestedBy',
                key: 'requestedBy',
                render: requestedBy => <div>{requestedBy}</div>
            },
            {
                title: 'Issued By',
                dataIndex: 'issuedBy',
                key: 'issuedBy',
                render: issuedBy => <div>{issuedBy}</div>
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: status => <div>{status}</div>
            },
            {
                title: 'Date of Request',
                dataIndex: 'dateOfRequest',
                key: 'dateOfRequest',
                render: dateOfRequest => <div>{dateOfRequest}</div>
            },
            {
                title: 'Date of Return',
                dataIndex: 'dateOfReturn',
                key: 'dateOfReturn',
                render: dateOfReturn => <div>{dateOfReturn}</div>
            },
            {
                title: 'Actual Date of Return',
                dataIndex: 'actualDateOfReturn',
                key: 'actualDateOfReturn',
                render: actualDateOfReturn => <div>{actualDateOfReturn}</div>
            },
        ];

        const bookLoansData = this.state.bookLoans.map(bookLoan => {
            const specification = bookLoan.book.specification;
            return ({
                key: bookLoan.id,
                serialNumber: bookLoan.book.serialNo,
                title: specification.name,
                author: specification.author.name,
                requestedBy: bookLoan.requestedBy.name,
                issuedBy: specification.issuedBy && bookLoan.issuedBy.name,
                status: bookLoan.status,
                dateOfRequest:moment(bookLoan.dateOfRequest).format("YYYY-MM-DD, h:mm a"),
                dateOfReturn: moment(bookLoan.dateOfReturn).format("YYYY-MM-DD, h:mm a"),
                actualDateOfReturn: bookLoan.actualDateOfReturn &&  moment(bookLoan.actualDateOfReturn).format("YYYY-MM-DD, h:mm a"),
                log: bookLoan.log,
            });
        });

        return (
            <Fragment>
                <Select
                    showSearch
                    style={{width:"40%"}}
                    placeholder="Select book"
                    optionFilterProp="children"
                    onSelect={this.fetchBookLoanHistory}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.state.books.map(book =>
                        <Option key={book.id} value={book.id}>
                            {`${book.specification.name} ${book.serialNo}`}
                        </Option>)}
                </Select>
                <Table style={{marginTop:"1rem"}} columns={columns} dataSource={bookLoansData} expandedRowRender={this.nestedLogTable}/>
            </Fragment>
        );
    }
}

const WrappedBookHistory = LayoutWrapper(BookHistory);
export default WrappedBookHistory;