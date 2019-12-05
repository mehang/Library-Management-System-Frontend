import React, {Component} from 'react';

import {Modal} from 'antd';

import {BookSearch} from '../BookSearch';
import LayoutWrapper from "../LayoutWrapper";
import {APIUrls} from "../../constants/urls";
import {msgType, TOKEN_KEY, USER_ID, userType} from "../../constants/constants";
import {isLoggedIn, showErrorModal, showSuccessModal} from "../../utils/utils";
import {Redirect} from "react-router-dom";

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
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        };
        fetch(APIUrls.BookRequest, data)
            .then(res => {
                if (res.ok) {
                    showSuccessModal("Request Accepted", "Your request for the book has been accepted.");
                } else {
                    const data = res.json();
                    throw new Error(data.message);
                }
            })
            .catch(error => {
                showErrorModal("Error","There was an error while placing your request for the book. Please try again later.");
            });
    };
    render(){
        if (!isLoggedIn(userType.STUDENT)){
            return <Redirect to="/unauthorized"/>
        }
    return (
        <BookSearch allowRequest={true} requestBook={this.requestBook}/>
    );
    }
}

const WrappedBookRequest = LayoutWrapper(BookRequest);
export default WrappedBookRequest;