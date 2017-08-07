import React, { Component } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react'
import * as Toastr from 'toastr';
import VoteApi from '../api/voteApi';
import 'semantic-ui-css/semantic.min.css';

export default class LikeLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.count,
            topicId: this.props.topicId
        };
        this.handleOnClickAsync = this.handleOnClickAsync.bind(this);
    }

    async handleOnClickAsync() {
        const userId = localStorage.getItem("id");
        const userIdSign = localStorage.getItem("id.sig");
        if (!userId) {
            Toastr.info("Please login before voting.");
            return;
        }

        const count = this.state.count;
        this.setState({
            count: count + 1
        });

        const status = await VoteApi.addCountAsync(this.state.topicId, userId, userIdSign);
        if (status === 406) {
            Toastr.warning("You have alread voted for the topic!");
            this.setState({
                count: count
            });
            return;
        }

        if (status === 401) {
            Toastr.warning("Invalid user, please log in with GitHub OAuth.");
            this.setState({
                count: count
            });
            return;
        }

        if (status !== 201) {
            Toastr.warning("Failed to vote, please try again.");
            this.setState({
                count: count
            });
            return;
        }
    }

    render() {
        return (
            <Button
                icon={<Icon name='heart' />}
                label={<Label content={this.props.count} />}
                size="tiny"
                onClick={this.handleOnClickAsync}
            />
        );
    }
}