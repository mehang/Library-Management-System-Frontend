import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Button, Divider, Table} from 'antd';

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
                        <Button type="primary" onClick={() => selectAuthor(author)}>Edit</Button>
                        <Divider type="vertical"/>
                        <Button type="danger" onClick={() => deleteAuthor(author.key)}>Delete</Button>
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
            <Table style={{marginTop:"1rem"}} columns={columns} dataSource={authorsData}/>
        );
};

AuthorTable.propTypes = {
    authors: PropTypes.array.isRequired,
    selectAuthor: PropTypes.func.isRequired,
    deleteAuthor: PropTypes.func.isRequired
};

export default AuthorTable;