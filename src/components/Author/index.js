import React, {Component} from "react";

export default class AuthorTable extends Component {
    constructor(props) {
        super(props);
        this.state={
            authors:[],
            name:"",
        }
    }

    componentDidMount() {
        fetch(aslkdjf)
            .then(res => res.json())
            .then(data => this.state({authors:datahalne}))
            .catch(error=> console.log(error));
    };

    registerPerson = () => {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'name': this.state.name,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(PSOT, data)
            .then(asdf)
            .catch(error => console.log(error));
    }

    render() {
        return(
            <div>

            </div>
        );
    }
}