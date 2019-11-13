import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Divider, Table} from 'antd';

const AuthorTable = props => {

        const {selectAuthor, deleteAuthor, authors} = props;
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: name => <div>{name}</div>
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, author) => (
                    <span>
                        <a onClick={() => selectAuthor(author)}>Edit</a>
                        <Divider type="vertical"/>
                        <a onClick={() => deleteAuthor(author.key)}>Delete</a>
                    </span>
                )
            },
        ];

        const authorsData = authors.map(author => {
            return ({
                key: author.id,
                name: author.name,
            })
        });

        return (
            <Table columns={columns} dataSource={authorsData}/>
        );
};

AuthorTable.propTypes = {
    authors: PropTypes.array.isRequired,
    selectAuthor: PropTypes.func.isRequired,
    deleteAuthor: PropTypes.func.isRequired
};

export default AuthorTable;