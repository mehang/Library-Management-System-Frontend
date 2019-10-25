import React, {Component} from 'react';
import {APIUrls} from "../../constants/urls";


export default class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            name: '',
            publication: '',
            edition: '',
            language: '',
            isbn: '',
        }
    }

    componentDidMount() {
        this.fetchBooks();
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    fetchBooks = () => {
        fetch(APIUrls.BookSpecs)
            .then(res => res.json())
            .then(data => this.setState({books: data}))
            .catch(error => console.log(error));
    }

    registerBook = () => {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'name': this.state.name,
                'publication': this.state.publication,
                'edition': this.state.edition,
                'language': this.state.language,
                'isbn': this.state.isbn,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.BookSpecs, data)
            .then(res => res.json())
            .then(data => this.fetchBooks())
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="row">
                        <div className="input-field col s12">
                            {/*<label className="field-label">Name</label>*/}
                            <div className="field input-field">
                                <input id="icon_prefix" type="text"
                                       name="name" className="validate"
                                       value={this.state.name} onChange={this.onChange}
                                />
                                <label htmlFor="icon_prefix">Book Name</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            {/*<label className="field-label">Publication</label>*/}
                            <div className="field input-field">
                                <input id="icon_prefix" type="text"
                                       name="publication" className="validate"
                                       value={this.state.publication} onChange={this.onChange}
                                />
                                <label htmlFor="icon_prefix">Publication</label>
                            </div>
                        </div>
                        <div className="input-field col s6">
                            {/*<label className="field-label">Edition</label>*/}
                            <div className="field input-field">
                                <input id="icon_prefix" type="text"
                                       name="edition" className="validate"
                                       value={this.state.edition}
                                       onChange={this.onChange}
                                />
                                <label htmlFor="icon_prefix">Edition</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            {/*<label className="field-label">Language</label>*/}
                            <div className="field input-field">
                                <input id="icon_prefix" type="text"
                                       name="language" className="validate"
                                       value={this.state.language}
                                       onChange={this.onChange}
                                />
                                <label htmlFor="icon_prefix">Language</label>
                            </div>
                        </div>
                        <div className="input-field col s6">
                            {/*<label className="field-label">ISBN</label>*/}
                            <div className="field input-field">
                                <input id="icon_prefix" type="text"
                                       name="isbn" className="validate"
                                       value={this.state.isbn}
                                       onChange={this.onChange}
                                />
                                <label htmlFor="icon_prefix">ISBN</label>
                            </div>
                        </div>
                    </div>


                    <div className="book-button-container input-field col s12">
                        <button className="button btn waves-effect waves-light"
                                type="submit" name="action"
                                onClick={this.registerBook}>Register
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
                <table className="striped">
                    <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Publication</th>
                        <th>Edition</th>
                        <th>Language</th>
                        <th>ISBN</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.books.map((bookspec, index) => (
                        <tr key={index}>
                            <td>{bookspec.name}</td>
                            <td>{bookspec.publication}</td>
                            <td>{bookspec.edition}</td>
                            <td>{bookspec.language}</td>
                            <td>{bookspec.isbn}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }

}