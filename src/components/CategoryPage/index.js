import React, {Component, Fragment} from 'react';

import {APIUrls} from "../../constants/urls";
import LayoutWrapper from "../LayoutWrapper";
import {EMPTY_STRING, msgType, TOKEN_KEY, userType} from "../../constants/constants";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";
import {isEmpty, isLoggedIn, showErrorModal, showSuccessModal} from "../../utils/utils";
import {Redirect} from "react-router-dom";

class CategoryPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            name: EMPTY_STRING,
            statusMsgType: msgType.SUCCESS,
            statusMsg: EMPTY_STRING,
            selectedCategory: {},
            categories:[],
        }
    }

    componentDidMount(){
        this.fetchCategories();
    }

    fetchCategories = () => {
        let data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            },
        };
        fetch(`${APIUrls.BookCategory}`, data)
            .then(res => {
                const data = res.json();
                if (res.ok){
                    return data;
                } else {
                    throw new Error(data.message);
                }
            })
            .then(data => {
                this.setState({categories: data, statusMsgType: msgType.SUCCESS});
            })
            .catch(error => {
                this.setState({statusMsgType:msgType.ERROR, statusMsg: error.toString()});
                showErrorModal("Error", error.toString());
            });
    };

    registerCategory = () => {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'name': this.state.name,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        };
        fetch(APIUrls.BookCategory, data)
            .then(res => {
                const data = res.json();
                if (res.ok) {
                    return data;
                } else {
                    throw new Error(data.message);
                }
            })
            .then(data => {
                this.fetchCategories();
                this.setState({name: EMPTY_STRING, statusMsgType: msgType.SUCCESS, statusMsg: "Saved successfully."});
                showSuccessModal("Saved Successfully", "The category has been registered successfully.")
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
                showErrorModal("Error", error.toString());
            });
    };

    updateCategory = () => {
        const categoryID = this.state.selectedCategory.key;
        let data = {
            method: 'PUT',
            body: JSON.stringify({
                'id': categoryID,
                'name': this.state.name,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        };
        fetch(APIUrls.BookCategory+categoryID, data)
            .then(res => {
                const data = res.json();
                if (res.ok) {
                    return data;
                } else {
                    throw new Error(data.message);
                }
            })
            .then(data => {
                this.fetchCategories();
                this.setState({name: EMPTY_STRING, statusMsgType: msgType.SUCCESS,
                    statusMsg: "Updated successfully.", selectedCategory: {}});
                showSuccessModal("Updated Successfully", "The category has been updated successfully.")
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
                showErrorModal("Error", error.toString());
            });
    };


    // deleteCategory = (id) => {
    //     let data = {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     };
    //     fetch(APIUrls.BookCategory+id, data)
    //         .then(res => {
    //             if (res.ok) {
    //                 this.fetchCategories();
    //                 showSuccessModal("Deleted Successfully", "The category has been deleted successfully.")
    //             } else {
    //                 throw new Error("Error while deleting category.");
    //             }
    //         })
    //         .catch(error => {
    //             this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
    //             showErrorModal("Error", error.toString());
    //         });
    // };

    onSubmit = () => {
        if (isEmpty(this.state.selectedCategory)){
            this.registerCategory();
        } else {
            this.updateCategory();
        }
    };

    onNameChange = name => this.setState({name});

    selectCategory = category => this.setState({selectedCategory: category, name: category.name});

    clearStatus = () => {
        this.setState({statusMsgType: msgType.SUCCESS, statusMsg: EMPTY_STRING});
    };

    render() {
        const {name,statusMsg, categories} = this.state;
        const statusClassName = this.state.statusMsgType === msgType.ERROR ? 'error-status' : 'success-status';
        if (!isLoggedIn(userType.LIBRARIAN)){
            return <Redirect to="/unauthorized"/>
        }
        return (
            <Fragment>
                <CategoryForm
                    name={name}
                    onNameChange={this.onNameChange}
                    onSubmit={this.onSubmit}
                    clearStatus={this.clearStatus}
                />
                {statusMsg && <div className={statusClassName}>{statusMsg}</div>}
                <CategoryTable
                    categories={categories}
                    selectCategory={this.selectCategory}
                    // deleteCategory={this.deleteCategory}
                />
            </Fragment>
        )
    }
}

const WrappedCategoryPage = LayoutWrapper(CategoryPage);
export default WrappedCategoryPage;