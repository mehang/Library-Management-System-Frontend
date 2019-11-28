import React, {Component} from 'react';

import {Modal} from 'antd';

import {BookSearch} from '../BookSearch';
import LayoutWrapper from "../LayoutWrapper";
import {APIUrls} from "../../constants/urls";
import {msgType, USER_ID} from "../../constants/constants";

class BookRequest extends Component {
    onSuccess = () => {
        Modal.success({
            title: 'Request Accepted',
            content: (
                <div>
                    <p>Your request for the book has been accepted.</p>
                </div>
            ),
            onOk() {},
        });
    };

    onError = () => {
        Modal.success({
            title: 'Error',
            content: (
                <div>
                    <p>There was an error while placing your request for the book. Please try again later.</p>
                </div>
            ),
            onOk() {},
        });
    };

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
                    return res.json();
                } else {
                    throw new Error("Problem in network connectivity.")
                }
            })
            .then(data => {
                this.onSuccess();
            })
            .catch(error => {
                this.onError();
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