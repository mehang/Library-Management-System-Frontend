import React, {Component, Fragment} from 'react';
import {EMPTY_STRING, TOKEN_KEY, USERNAME, userType} from "../../constants/constants";
import {APIUrls} from "../../constants/urls";
import {isLoggedIn, isNumber, showErrorModal} from "../../utils/utils";
import {Table} from "antd";
import LayoutWrapper from "../LayoutWrapper";
import moment from "moment";
import {Redirect} from "react-router-dom";


class StudentHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookLoans:[],
        }
    }

    componentDidMount() {
        this.fetchBookLoanHistory();
    }

    fetchBookLoanHistory = () => {
        let data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            },
        };
        const username = localStorage.getItem(USERNAME);
        fetch(`${APIUrls.User+username}/bookloans`, data)
            .then(res => res.json())
            .then(data => {
                if (isNumber(data.status) && data.status !== 200) {
                    throw new Error(data.message);
                }
                this.setState({bookLoans: data});
            })
            .catch(error => {
                this.setState({bookLoans:[]});
                showErrorModal('Error', 'Error while fetching the history for the book');
            });
    }

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
        if (!isLoggedIn(userType.STUDENT)){
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
                issuedBy: bookLoan.issuedBy && bookLoan.issuedBy.name,
                status: bookLoan.status,
                dateOfRequest:moment(bookLoan.dateOfRequest).format("YYYY-MM-DD, h:mm a"),
                dateOfReturn: moment(bookLoan.dateOfReturn).format("YYYY-MM-DD, h:mm a"),
                actualDateOfReturn: bookLoan.actualDateOfReturn &&  moment(bookLoan.actualDateOfReturn).format("YYYY-MM-DD, h:mm a"),
                log: bookLoan.log,
            });
        });

        return (
            <Fragment>
                <div style={{fontSize: "x-large", fontWeight: "bold", marginBottom: "12px"}}>
                    Loan History
                </div>
                <Table style={{marginTop:"1rem"}} columns={columns} dataSource={bookLoansData} expandedRowRender={this.nestedLogTable}/>
            </Fragment>
        );
    }
}

const WrappedStudentHistory = LayoutWrapper(StudentHistory);
export default WrappedStudentHistory;