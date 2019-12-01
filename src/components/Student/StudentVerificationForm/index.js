import React, {Component} from 'react';
import {EMPTY_STRING} from "../../../constants/constants";
import {Button, Form, Icon, Input} from "antd";
import {Link} from "react-router-dom";

const { Search } = Input;

class StudentVerificationForm extends Component {
    constructor(props){
        super(props);
        this.state={
            loading: false,
            error:EMPTY_STRING
        }
    }

    verifyStudent = (value, e) => {
        e.preventDefault();
        this.setState({loading:true});
        //todo: call backend and then redirect to registration form
        console.log(value);
    };

    render() {
        return (
            <div style={{paddingTop: "30px", backgroundColor: "#bae7ff", height: "100vh"}}>
                <div style={{margin:"auto",width:"420px"}}>
                        <div style={{fontSize: "x-large", fontWeight: "bold", marginBottom: "12px"}}>
                            Verification
                        </div>
                        <Search placeholder="Enter Student ID"
                                loading={this.state.loading}
                                enterButton
                                onSearch={this.verifyStudent}
                        />
                </div>
            </div>
        )
    }
}

export default StudentVerificationForm;