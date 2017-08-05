import React, { Component } from 'react';
import { Header, Divider, Loader, Container } from 'semantic-ui-react';
import * as Toastr from 'toastr';

import LikeLabel from './LikeLabel';
import VoteApi from '../api/voteApi';
import Navbar from './Navbar';
import { isEncrypt } from "../util";

export default class Details extends Component {
    constructor(props) {
        super(props);
        const topicId = this.props.match.params.id;

        this.state = {
            loading: true,
            topicId: topicId
        }
        this.handleOnClickAsync = this.handleOnClickAsync.bind(this);
    }

    async componentWillMount() {
        const id = this.state.topicId;
        if (!id) {
            return;
        }

        const topic = await VoteApi.getTopicByIdAsync(id);
        this.setState({
            title: topic.title,
            description: topic.description,
            count: topic.count,
            loading: false
        });
    }

    async handleOnClickAsync() {
        const { topicId } = this.state;
        const userId = localStorage.getItem("id");
        const userIdSig = localStorage.getItem("id.sig");

        if (!userId) {
            Toastr.info("Please login before voting.");
            return;
        }

        if (!isEncrypt(userId, userIdSig)) {
            Toastr.info("Invalid user, please re-login before voting.");
            return;
        }

        const count = this.state.count;
        this.setState({
            count: count + 1
        });

        const status = await VoteApi.addCountAsync(topicId, userId);

        switch (status) {
            case 406:
                Toastr.warning("You have already voted for the topic!");
                this.setState({
                    count: count
                });
                return;
            case 401:
                this.setState({
                    count: count + 1
                });
                Toastr.warning("Invalid user, please login with GitHub OAuth.");
                return;
            default:
                return;
        }
    }

    render() {
        return (
            <div className="App">
                <Navbar />
                <Container text>
                    {
                        this.state.loading ?
                            <Loader active inline='centered' />
                            :
                            <Container text>
                                <Header as='h2'>{this.state.title} </Header>
                                <LikeLabel count={this.state.count} handleOnClick={this.handleOnClickAsync} />
                                <Divider />
                                <p> {this.state.description} </p>
                            </Container>
                    }
                </Container>
            </div>
        );
    }
}