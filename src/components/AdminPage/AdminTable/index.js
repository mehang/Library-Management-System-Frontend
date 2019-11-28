import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Divider, Table} from 'antd';

const AdminTable = props => {

    const { deleteAdmin, admins} = props;
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
            render: (text, librarian) => (
                <span>
                        <a onClick={() => deleteAdmin(librarian.key)}>Delete</a>
                    </span>
            )
        },
    ];

    const adminsData = admins.map(admin => {
        return ({
            key: admin.id,
            username: admin.username,
            name: admin.name,
            email: admin.email,
            phoneNumber: admin.phoneNumber
        })
    });

    return (
        <Table style={{marginTop:"1rem"}} columns={columns} dataSource={adminsData}/>
    );
};

AdminTable.propTypes = {
    admins: PropTypes.array.isRequired,
    deleteAdmin: PropTypes.func.isRequired
};

export default AdminTable;