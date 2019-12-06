import React, {Component, Fragment} from 'react';
import {EMPTY_STRING,  VERIFICATION_ID} from "../../../constants/constants";
import {Button,  Icon, Input} from "antd";
import {APIUrls} from "../../../constants/urls";
import {showErrorModal} from "../../../utils/utils";

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
        fetch(APIUrls.StudentVerification+value)
            .then(res => {
                if (res.ok) {
                    this.setState({loading:false});
                    localStorage.setItem(VERIFICATION_ID,value)
this.props.history.push('/registration');
                } else {
                    throw new Error('Error while fetching profile data.');
                }
            })
            .catch(error => {
                this.setState({loading: false});
                showErrorModal('Error', 'The student ID provided is not valid.');
            });
    };

    render() {
        return (
            <Fragment>
            <div style={{paddingTop: "130px", backgroundColor: "#bae7ff", height: "100vh"}}>
                <Button
                    type="primary" shape="circle" size="large"
                    style={{position:"absolute", top:"20px", left:"20px"}}
                    onClick={() => this.props.history.push("/")}
                >
                    <Icon type="home"/>
                </Button>
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
            </Fragment>
        )
    }
}

export default StudentVerificationForm;