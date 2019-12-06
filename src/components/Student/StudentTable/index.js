import React, {Component} from 'react';

import {Button,  Table} from 'antd';
import {APIUrls} from "../../../constants/urls";
import {msgType, TOKEN_KEY, userType} from "../../../constants/constants";
import LayoutWrapper from "../../LayoutWrapper";
import {isLoggedIn, showErrorModal, showSuccessModal} from "../../../utils/utils";
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
        let data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            },
        };
        await fetch(`${APIUrls.Student}`, data)
            .then(res => {
                const data = res.json();
                if (res.ok) {
                    return data;
                } else {
                    throw new Error(data.message);
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
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            },
        };
        fetch(APIUrls.Student+ id, data)
            .then(res => {
                if (res.ok) {
                    this.fetchStudents();
                    showSuccessModal("Deleted Successfully","The student has been successfully,");
                } else {
                const data = res.json();
                    throw new Error(data.message);
                }
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
                showErrorModal("Error", error.toString());
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
                        <Button type="danger" onClick={() => this.deleteStudent(student.key)}>Delete</Button>
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