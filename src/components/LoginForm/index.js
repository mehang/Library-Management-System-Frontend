import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';
import {EMPTY_STRING, TOKEN_KEY, USER_ID, USER_TYPE, USERNAME} from "../../constants/constants";
import {Link} from "react-router-dom";
import {APIUrls} from "../../constants/urls";
import {isNumber} from "../../utils/utils";

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: EMPTY_STRING,
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = {
                    method: 'POST',
                    body: JSON.stringify({
                        'username': values.username,
                        'password': values.password,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                };
                fetch(APIUrls.Authenticate, data)
                    .then(res => {
                        if (res.status === 401) {
                            throw new Error("Either username or password is not correct");
                        } else {
                            return res.json();
                        }
                    })
                    .then(data => {
                        if (isNumber(data.status) && data.status !== 200) {
                            throw new Error(data.message);
                        }
                        localStorage.setItem(TOKEN_KEY,data.token);
                        localStorage.setItem(USERNAME, data.username);
                        localStorage.setItem(USER_ID, data.userPK);
                        localStorage.setItem(USER_TYPE, data.type);
                        this.props.history.push('/');
                    })
                    .catch(error => {
                        this.setState({error: error.toString()});
                    })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div style={{paddingTop: "30px", backgroundColor: "#bae7ff", height: "100vh"}}>
                <Button
                    type="primary" shape="circle" size="large"
                    style={{position:"absolute", top:"20px", left:"20px"}}
                    onClick={() => this.props.history.push("/")}
                >
                    <Icon type="home"/>
                </Button>
                <div className="login-form-container">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        {this.state.error && <div className="error-status">{this.state.error}</div>}
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: 'Please input your username!'}],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Link className="login-form-forgot" to="/forgot-password">
                                Forgot password
                            </Link>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <Link to="/student-verification">student register now!</Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

const WrappedLoginForm = Form.create({name: 'normal_login'})(LoginForm);

export default WrappedLoginForm;