import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Divider, Table} from 'antd';

const CategoryTable = props => {

    const {selectCategory, deleteCategory, categories} = props;
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
            render: (text, category) => (
                <span>
                        <a onClick={() => selectCategory(category)}>Edit</a>
                        <Divider type="vertical"/>
                        <a onClick={() => deleteCategory(category.key)}>Delete</a>
                    </span>
            )
        },
    ];

    const categoriesData = categories.map(category => {
        return ({
            key: category.id,
            name: category.name,
        })
    });

    return (
        <Table columns={columns} dataSource={categoriesData}/>
    );
};

CategoryTable.propTypes = {
    categories: PropTypes.array.isRequired,
    selectCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired
};

export default CategoryTable;