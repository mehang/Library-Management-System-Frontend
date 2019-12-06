import React from 'react';
import PropTypes from 'prop-types';

import {Button,  Table} from 'antd';

const CategoryTable = props => {

    const {selectCategory,  categories} = props;
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
                        <Button type="primary" onClick={() => selectCategory(category)}>Edit</Button>
                        {/*<Divider type="vertical"/>*/}
                        {/*<Button type="danger" onClick={() => deleteCategory(category.key)}>Delete</Button>*/}
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
        <Table style={{marginTop:"1rem"}} columns={columns} dataSource={categoriesData}/>
    );
};

CategoryTable.propTypes = {
    categories: PropTypes.array.isRequired,
    selectCategory: PropTypes.func.isRequired,
};

export default CategoryTable;