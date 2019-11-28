import React, {Component, Fragment} from "react";

import {Button, Col, Input, Row, Select} from 'antd';
import PropTypes from 'prop-types';

import {EMPTY_STRING} from "../../../constants/constants";
import {isEmpty} from "../../../utils/utils";

const {Option} = Select;

class BookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validation: {
                name: {
                    required: true,
                    error: EMPTY_STRING
                },
                isbn: {
                    required: true,
                    error: EMPTY_STRING
                },
                author: {
                    required: true,
                    error: EMPTY_STRING
                },
            }
        }
    }

    validateName = () => {
        let {validation} = this.state;
        if (validation.name.required && isEmpty(this.props.name)) {
            validation.name.error = "This input is required";
        } else {
            validation.name.error = EMPTY_STRING;
        }
        this.setState({validation: validation});
    };

    validateIsbn = () => {
        let {validation} = this.state;
        if (validation.isbn.required && isEmpty(this.props.isbn)) {
            validation.isbn.error = "This input is required";
        } else {
            validation.isbn.error = EMPTY_STRING;
        }
        this.setState({validation: validation});
    };

    validateAuthor = () => {
        let {validation} = this.state;
        if (validation.author.required && isEmpty(this.props.selectedAuthorID)) {
            validation.author.error = "This input is required";
        } else {
            validation.author.error = EMPTY_STRING;
        }
        this.setState({validation: validation});
    };


    handleSubmit = e => {
        e.preventDefault();
        const {validation} = this.state;
        if (!(validation.name.error || validation.isbn.error || validation.author.error)){
            this.props.onSubmit();
        }
    };

    render() {
        const {name, publication,edition,language,isbn,authors, selectedAuthorID,
            categories, selectedCategoriesID, onNameChange,onPublicationChange,
            onEditionChange,onIsbnChange, onLanguageChange, onAuthorChange,
            onCategoriesChange, clearStatus} = this.props;
        return (
            <Fragment>
                <form>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={3}>
                                <label className="required-field">Name</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={name}
                                    onChange={e => onNameChange(e.target.value)}
                                    onBlur={this.validateName}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.name.error &&
                                <div className="input-error">{this.state.validation.name.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={3}>
                                <label className="required-field">Publication</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={publication}
                                    onChange={e => onPublicationChange(e.target.value)}
                                    onClick={clearStatus}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={3}>
                                <label className="required-field">Edition</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={edition}
                                    onChange={e => onEditionChange(e.target.value)}
                                    onClick={clearStatus}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={3}>
                                <label className="required-field">Language</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={language}
                                    onChange={e => onLanguageChange(e.target.value)}
                                    onClick={clearStatus}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={3}>
                                <label className="required-field">ISBN</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={isbn}
                                    onChange={e => onIsbnChange(e.target.value)}
                                    onBlur={this.validateIsbn}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.isbn.error &&
                                <div className="input-error">{this.state.validation.isbn.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={3}>
                                <label className="required-field">Author</label>
                            </Col>
                            <Col span={8}>
                                <Select
                                    showSearch
                                    placeholder="Select a Author"
                                    value={selectedAuthorID}
                                    optionFilterProp="children"
                                    onChange={onAuthorChange}
                                    onFocus={clearStatus}
                                    onBlur={this.validateAuthor}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {authors.map(author =>
                                        <Option key={author.id} value={author.id}>
                                            {author.name}
                                        </Option>)}
                                </Select>
                                {this.state.validation.author.error &&
                                <div className="input-error">{this.state.validation.author.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={3}>
                                <label className="required-field">Category</label>
                            </Col>
                            <Col span={8}>
                                <Select
                                    mode="multiple"
                                    placeholder="Please select category"
                                    value={selectedCategoriesID}
                                    onChange={onCategoriesChange}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {categories.map(category =>
                                        <Option key={category.id} value={category.id}>
                                            {category.name}
                                        </Option>)}
                                </Select>
                            </Col>
                        </Row>
                    </div>
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                        Register
                    </Button>
                </form>
            </Fragment>
        );
    }
}

BookForm.propTypes = {
    name: PropTypes.string.isRequired,
    publication: PropTypes.string,
    edition: PropTypes.string,
    language: PropTypes.string,
    isbn: PropTypes.string.isRequired,
    authors: PropTypes.array,
    selectedAuthorID: PropTypes.number,
    categories: PropTypes.array,
    selectedCategoriesID: PropTypes.array,
    onNameChange: PropTypes.func.isRequired,
    onPublicationChange: PropTypes.func.isRequired,
    onEditionChange: PropTypes.func.isRequired,
    onLanguageChange: PropTypes.func.isRequired,
    onIsbnChange: PropTypes.func.isRequired,
    onAuthorChange: PropTypes.func.isRequired,
    onCategoriesChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    clearStatus: PropTypes.func.isRequired,
};

export default BookForm;