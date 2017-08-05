import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Loader } from 'semantic-ui-react'
import { encrypt } from '../util';

class Callback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    getParameterByName(name) {
        const index = window.location.pathname.lastIndexOf('/');
        return window.location.pathname.slice(index + 1);
    }

    async componentWillMount() {
        let id = this.getParameterByName('id');
        await fetch(`/api/user/${id}`)
            .then(res => res.json())
            .then(user => {
                localStorage.setItem("userName", user.profile.name);
                localStorage.setItem("id", id);
                localStorage.setItem("id.sig", encrypt(id));
            });
        this.setState({
            loading: false
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <Loader active inline='centered' />
            );
        }

        return (
            <Redirect to={{
                pathname: "/",
                state: { from: this.props.location }
            }} />
        )
    }
}

export default Callback;