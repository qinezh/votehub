import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as Toastr from 'toastr';
import { Form, Button, Container } from 'semantic-ui-react';
import VoteApi from '../api/voteApi';
import Navbar from './Navbar';

export default class CreateTopic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            created: false
        }
        this.handleSubmitAsync = this.handleSubmitAsync.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmitAsync() {
        const { title, description } = this.state;
        const ownerId = localStorage.getItem("id");
        const idSign = localStorage.getItem("id.sig");
        const status = await VoteApi.createTopicAsync(ownerId, idSign, title, description);

        if (status === 401) {
            Toastr.warning("Invalid user, please log in with GitHub OAuth.");
            return;
        }

        this.setState({
            created: true
        });
        Toastr.success("Create a new feature successfully.");
    }

    handleChange(e, { name, value }) {
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="App">
                <Navbar />
                {
                    this.state.created ?
                        <Redirect to="/" />
                        :
                        <Container text>
                            <Form onSubmit={this.handleSubmitAsync}>
                                <Form.Input label='Title' name='title' value={this.state.title} onChange={this.handleChange} placeholder='Feature title' />
                                <Form.TextArea label='Description' name='description' value={this.state.description} onChange={this.handleChange} placeholder='Tell us more about you...' />

                                <Button type='submit'>Submit</Button>
                            </Form>
                        </Container>
                }
            </div>
        );
    }
}