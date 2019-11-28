import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Divider, Table} from 'antd';

const LibrarianTable = props => {

    const { deleteLibrarian, librarians} = props;
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
                        <a onClick={() => deleteLibrarian(librarian.key)}>Delete</a>
                    </span>
            )
        },
    ];

    const librariansData = librarians.map(librarian => {
        return ({
            key: librarian.id,
            username: librarian.username,
            name: librarian.name,
            email: librarian.email,
            phoneNumber: librarian.phoneNumber,
        })
    });

    return (
        <Table style={{marginTop:"1rem"}} columns={columns} dataSource={librariansData}/>
    );
};

LibrarianTable.propTypes = {
    librarians: PropTypes.array.isRequired,
    deleteLibrarian: PropTypes.func.isRequired
};

export default LibrarianTable;