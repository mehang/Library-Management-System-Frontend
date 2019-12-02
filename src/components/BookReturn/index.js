import React, {Component, Fragment} from 'react';
import {Input, Modal, Select, Table, Tag} from "antd";
import LayoutWrapper from "../LayoutWrapper";
import {EMPTY_STRING, USER_ID} from "../../constants/constants";
import {APIUrls} from "../../constants/urls";
import {showErrorModal, showSuccessModal} from "../../utils/utils";

const {Search} = Input;

class BookReturn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serialNumber: EMPTY_STRING,
            isLoading: false,
        }
    }

    returnBook = serialNo => {
        this.setState({isLoading:true});
        const data = {
            method: 'POST',
            body: JSON.stringify({
                'serialNo': serialNo,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.BookReturn, data)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Problem in network connectivity.")
                }
            })
            .then(data => {
                this.setState({isLoading:false, serialNumber:EMPTY_STRING});
                showSuccessModal("Recorded Return Successfully","Return of the book has been recorded successfully.")
            })
            .catch(error => {
                this.setState({isLoading:false});
                showErrorModal("Error", error.toString());
            });
    };

    render(){
        return (
            <div style={{paddingTop: "30px", backgroundColor: "#bae7ff", height: "100%"}}>
                <div style={{margin:"auto",width:"420px"}}>
                    <div style={{fontSize: "x-large", fontWeight: "bold", marginBottom: "12px"}}>
                        Book Return
                    </div>
                    <Search placeholder="Enter Book Serial Number"
                            loading={this.state.loading}
                            enterButton="Return"
                            onChange={value => this.setState({serialNumber:value})}
                            onSearch={this.returnBook}
                    />
                </div>
            </div>
        );
    }
}

const WrappedBookReturn = LayoutWrapper(BookReturn);
export default WrappedBookReturn;