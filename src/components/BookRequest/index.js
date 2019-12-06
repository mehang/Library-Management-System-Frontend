import React, {Component} from 'react';

import {BookSearch} from '../BookSearch';
import LayoutWrapper from "../LayoutWrapper";
import {APIUrls} from "../../constants/urls";
import { TOKEN_KEY, USER_ID, userType} from "../../constants/constants";
import {isLoggedIn, isNumber, showErrorModal, showSuccessModal} from "../../utils/utils";
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
            .then(res=>res.json())
            .then(data => {
                if (isNumber(data.status) && data.status !== 200) {
                    throw new Error(data.message);
                }
                    showSuccessModal("Request Accepted", "Your request for the book has been accepted.");
            })
            .catch(error => {
                showErrorModal("Error",error.toString());
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