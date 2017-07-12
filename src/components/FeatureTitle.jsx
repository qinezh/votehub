import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import LikeLabel from './LikeLabel';
import VoteApi from '../api/voteApi';
import 'semantic-ui-css/semantic.min.css';

export default class FeatureTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.count,
            adjustOrder: this.props.adjustOrder
        };
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.setState({
            count: this.state.count+1
        });
        VoteApi.addCount(this.props.title);
        this.state.adjustOrder();
    }

    render() {
        return (
            <Table.Row>
                <Table.Cell>
                    <LikeLabel count={this.state.count} handleOnClick={this.handleOnClick} />
                </Table.Cell>
                <Table.Cell>
                    {this.props.title}
                </Table.Cell>
            </Table.Row>
        );
    }
}