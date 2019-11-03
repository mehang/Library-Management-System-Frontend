import React, {Component} from "react";
import {APIUrls} from '../../constants/urls'

export default class Author extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            name: "",
        }
    }

    componentDidMount() {
        this.fetchAuthors();
    };

    onChange = e => this.setState({[e.target.name]: e.target.value});

    fetchAuthors = () => {
        fetch(APIUrls.Author)
            .then(res => res.json())
            .then(data => this.setState({authors: data}))
            .catch(error => console.log(error));
    };

    registerAuthor = () => {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'name': this.state.name,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.Author, data)
            .then(res => res.json())
            .then(data => this.fetchAuthors())
            .catch(error => console.log(error));
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">account_circle</i>
                        <input id="icon_prefix" type="text"
                               name="name" className="validate"
                               value={this.state.name} onChange={this.onChange}
                        />
                        <label htmlFor="icon_prefix">Author Name</label>
                    </div>
                    <div className="button-container input-field col s6">
                        <button className="button btn waves-effect waves-light"
                                type="submit" name="action"
                                onClick={this.registerAuthor}>Register
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
                <table className="striped">
                    <thead>
                    <tr>
                        <th>Author Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.authors.map((author, index) => (
                        <tr key={index}>
                            <td>{author.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}