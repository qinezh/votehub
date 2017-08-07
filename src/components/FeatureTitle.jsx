import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import LikeLabel from './LikeLabel';
import VoteApi from '../api/voteApi';
import 'semantic-ui-css/semantic.min.css';

export default class FeatureTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.feature.count,
            topicId: this.props.feature._id,
            title: this.props.feature.title,
            adjustOrder: this.props.adjustOrder,
        };
    }

    render() {
        return (
            <Table.Row>
                <Table.Cell singleLine>
                    <LikeLabel count={this.state.count} topicId={this.state.topicId}/>
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