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
            feature: this.props.feature,
            adjustOrder: this.props.adjustOrder
        };
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.setState({
            feature: {
                "id": this.state.feature.id,
                "count": this.state.feature.count + 1,
                "title": this.state.feature.title
            }
        });
        VoteApi.addCount(this.state.feature.id);
        this.state.adjustOrder();
    }

    render() {
        return (
            <Table.Row>
                <Table.Cell>
                    <LikeLabel count={this.state.feature.count} handleOnClick={this.handleOnClick} />
                </Table.Cell>
                <Table.Cell>
                    <Link to={process.env.PUBLIC_URL + `/details/${this.state.feature.id}`}>
                        {this.props.feature.title}
                    </Link>
                </Table.Cell>
            </Table.Row>
        );
    }
}