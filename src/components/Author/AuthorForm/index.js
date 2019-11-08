import React, {Component, Fragment} from "react";

import {Button, Col, Input, Row} from 'antd';
import PropTypes from 'prop-types';

import {EMPTY_STRING} from "../../../constants/constants";

class AuthorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validation: {
                name: {
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

    handleSubmit = e => {
        e.preventDefault();
        const {validation} = this.state;
        if (!validation.name.error){
            this.registerAuthor();
        }
    };

    render() {
        const {name,onNameChange, clearStatus} = this.props;
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
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                        Register
                    </Button>
                </form>
            </Fragment>
        );
    }
}

AuthorForm.propTypes = {
    name: PropTypes.string.isRequired,
    onNameChange: PropTypes.func.isRequired,
    fetchAuthors: PropTypes.func.isRequired,
    registerAuthor: PropTypes.func.isRequired,
    updateAuthor: PropTypes.func.isRequired,
    clearStatus: PropTypes.func.isRequired,
};

export default AuthorForm;