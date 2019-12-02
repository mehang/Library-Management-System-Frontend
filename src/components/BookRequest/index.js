import React, {Component} from 'react';

import {Modal} from 'antd';

import {BookSearch} from '../BookSearch';
import LayoutWrapper from "../LayoutWrapper";
import {APIUrls} from "../../constants/urls";
import {msgType, USER_ID} from "../../constants/constants";
import {showErrorModal, showSuccessModal} from "../../utils/utils";

class BookRequest extends Component {
    requestBook = id => {
        const studentID = localStorage.getItem(USER_ID);
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'bookId': id,
                'userId': studentID,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.BookRequest, data)
            .then(res => {
                if (res.ok) {
                    showSuccessModal("Request Accepted", "Your request for the book has been accepted.");
                } else {
                    throw new Error("Problem in network connectivity.")
                }
            })
            .catch(error => {
                showErrorModal("Error","There was an error while placing your request for the book. Please try again later.");
            });
    };
    render(){
    return (
        <BookSearch allowRequest={true} requestBook={this.requestBook}/>
    );
    }
}

const WrappedBookRequest = LayoutWrapper(BookRequest);
export default WrappedBookRequest;