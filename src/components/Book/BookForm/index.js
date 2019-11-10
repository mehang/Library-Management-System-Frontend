import React, {Component, Fragment} from "react";

import {Button, Col, Input, Row} from 'antd';
import PropTypes from 'prop-types';

import {EMPTY_STRING} from "../../../constants/constants";

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
            }
        }
    }

    validateName = () => {
        let {validation} = this.state;
        if (validation.name.required && this.state.name === EMPTY_STRING) {
            validation.name.error = "This input is required";
        } else {
            validation.name.error = EMPTY_STRING;
        }
        this.setState({validation: validation});
    };

    validateIsbn = () => {
        let {validation} = this.state;
        if (validation.isbn.required && this.props.isbn === EMPTY_STRING) {
            validation.isbn.error = "This input is required";
        } else {
            validation.isbn.error = EMPTY_STRING;
        }
        this.setState({validation: validation});
    };

    handleSubmit = e => {
        e.preventDefault();
        const {validation} = this.state;
        if (!(validation.name.error || validation.isbn.error)){
            this.registerAuthor();
        }
    };

    render() {
        const {name, publication,edition,language,isbn, onNameChange,onPublicationChange,
            onEditionChange,onIsbnChange, onLanguageChange, clearStatus} = this.props;
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
    publication: PropTypes.string.isRequired,
    edition: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    isbn: PropTypes.string.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onPublicationChange: PropTypes.func.isRequired,
    onEditionChange: PropTypes.func.isRequired,
    onLanguageChange: PropTypes.func.isRequired,
    onIsbnChange: PropTypes.func.isRequired,
    registerBook: PropTypes.func.isRequired,
    updateBook: PropTypes.func.isRequired,
    clearStatus: PropTypes.func.isRequired,
};

export default BookForm;