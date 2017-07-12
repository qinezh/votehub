import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import FeatureTitleTable from './FeatureTitleTable';
import VoteApi from '../api/voteApi';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "features": VoteApi.getAll()
        }
    }
    render() {
        return (
            <div>
                <Header as="h2">
                    Voting for your features
            </Header>
                <FeatureTitleTable features={this.state.features} />
            </div>
        );
    }
}