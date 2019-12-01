import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Button, Divider, Table} from 'antd';
import {APIUrls} from "../../../constants/urls";
import {msgType, userType} from "../../../constants/constants";
import LayoutWrapper from "../../LayoutWrapper";
import {AuthorPage} from "../../AuthorPage";
import {isLoggedIn} from "../../../utils/utils";
import {Redirect} from "react-router-dom";

class StudentTable extends Component {
    constructor(props){
        super(props);
        this.state={
            students: [],
        }
    }

    componentDidMount() {
        this.fetchStudents();
    }

    fetchStudents = async () => {
        await fetch(`${APIUrls.Student}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Error while fetching students.");
                }
            })
            .then(data => {
                this.setState({students: data, statusMsgType: msgType.SUCCESS});
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
            });
    };

    deleteStudent = (id) => {
        let data = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch(`${APIUrls.Student}delete/${id}`, data)
            .then(res => {
                if (res.ok) {
                    this.fs();
                } else {
                    throw new Error("Error while deleting student.");
                }
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
            });
    };

render() {
    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: username => <div>{username}</div>
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: name => <div>{name}</div>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: email => <div>{email}</div>
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: phoneNumber => <div>{phoneNumber}</div>
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, student) => (
                <span>
                        <Button type="danger" onClick={() => this.deleteStudentt(student.key)}>Delete</Button>
                    </span>
            )
        },
    ];

    const studentsData = this.state.students.map(student => {
        return ({
            key: student.id,
            username: student.username,
            name: student.name,
            email: student.email,
            phoneNumber: student.phoneNumber,
        })
    });

    if (!isLoggedIn(userType.LIBRARIAN )){
        return (<Redirect to="/unauthorized"/>);
    }

    return (
        <Table columns={columns} dataSource={studentsData}/>
    );
}
}

const WrappedStudentTable = LayoutWrapper(StudentTable);
export default WrappedStudentTable;