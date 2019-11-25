import React, {Component} from 'react';
import {Input} from "antd";

const { Search } = Input;

class BookReturn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestedBooks: [],
        }
    }

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
        );
    }
}

export default BookReturn;