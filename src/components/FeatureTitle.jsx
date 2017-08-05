import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import * as Toastr from 'toastr';
import LikeLabel from './LikeLabel';
import VoteApi from '../api/voteApi';
import 'semantic-ui-css/semantic.min.css';

export default class FeatureTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.feature.count,
            topicId: this.props.feature.id,
            title: this.props.feature.title,
            adjustOrder: this.props.adjustOrder,
        };
        this.handleOnClickAsync = this.handleOnClickAsync.bind(this);
    }

    async handleOnClickAsync() {
        const userId = localStorage.getItem("id");
        if (!userId) {
            Toastr.info("Please login before voting.");
            return;
        }

        const count = this.state.count;
        this.setState({
            count: count + 1
        });

        this.state.adjustOrder();
        const status = await VoteApi.addCountAsync(this.state.topicId, userId);
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


    }

    render() {
        return (
            <Table.Row>
                <Table.Cell singleLine>
                    <LikeLabel count={this.state.count} handleOnClick={this.handleOnClickAsync} />
                </Table.Cell>
                <Table.Cell >
                    <Link to={process.env.PUBLIC_URL + `/details/${this.state.topicId}`}>
                        {this.state.title}
                    </Link>
                </Table.Cell>
            </Table.Row>
        );
    }
}