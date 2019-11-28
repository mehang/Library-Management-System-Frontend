import React, {Component, Fragment} from 'react';

import {APIUrls} from "../../constants/urls";
import LayoutWrapper from "../LayoutWrapper";
import {EMPTY_STRING,msgType} from "../../constants/constants";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";
import {isEmpty} from "../../utils/utils";

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
        fetch(`${APIUrls.BookCategory}`)
            .then(res => {
                if (res.ok){
                    return res.json();
                } else {
                    throw new Error("Error while fetching categories");
                }
            })
            .then(data => {
                this.setState({categories: data, statusMsgType: msgType.SUCCESS});
            })
            .catch(error => {
                this.setState({statusMsgType:msgType.ERROR, statusMsg: error.toString()});
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
            }
        };
        fetch(APIUrls.BookCategory, data)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Problem in network connectivity.")
                }
            })
            .then(data => {
                this.fetchCategories();
                this.setState({name: EMPTY_STRING, statusMsgType: msgType.SUCCESS, statusMsg: "Saved successfully."});
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
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
            }
        };
        fetch(APIUrls.BookCategory+categoryID, data)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Problem in network connectivity");
                }
            })
            .then(data => {
                this.fetchCategories();
                this.setState({name: EMPTY_STRING, statusMsgType: msgType.SUCCESS,
                    statusMsg: "Updated successfully.", selectedCategory: {}});
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
            });
    };


    deleteCategory = (id) => {
        let data = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch(`${APIUrls.BookCategory}delete/${id}`, data)
            .then(res => {
                if (res.ok) {
                    this.fetchCategories();
                } else {
                    throw new Error("Error while deleting author.");
                }
            })
            .catch(error => {
                this.setState({statusMsgType: msgType.ERROR, statusMsg: error.toString()});
            });
    };

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
                    deleteCategory={this.deleteCategory}
                />
            </Fragment>
        )
    }
}

const WrappedCategoryPage = LayoutWrapper(CategoryPage);
export default WrappedCategoryPage;