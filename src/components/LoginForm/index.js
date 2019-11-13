import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {EMPTY_STRING} from "../../constants/constants";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: EMPTY_STRING,
            password: EMPTY_STRING
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //todo: call backend
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div style={{paddingTop:"30px", backgroundColor:"#bae7ff", height: "100vh"}}>
                <div className="login-form-container">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Username"
                                value={this.state.username}
                                onChange={e => this.setState({username: e.target.username})}
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
                                value={this.state.password}
                                onChange={e => this.setState({password: e.target.value})}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {/*{getFieldDecorator('remember', {*/}
                        {/*    valuePropName: 'checked',*/}
                        {/*    initialValue: true,*/}
                        {/*})(<Checkbox>Remember me</Checkbox>)}*/}
                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
                </div>
            </div>
        );
    }
}

const WrappedLoginForm = Form.create({name: 'normal_login'})(LoginForm);

export default WrappedLoginForm;