import React, { Component } from 'react';
import { Header, Loader, Container } from 'semantic-ui-react'
import VoteApi from '../api/voteApi';
import FeatureTitleTable from './FeatureTitleTable';
import Navbar from './Navbar';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            features: []
        }
    }

    async componentWillMount() {
        const features = await VoteApi.getAllTopicsAsync();
        this.setState({
            loading: false,
            features
        });
    }

    render() {
        return (
            <div className="App">
                <Navbar />
                <Container text>
                    <Header as="h2">
                        Voting for your features
                    </Header>
                    {
                        this.state.loading ?
                            <Loader />
                            :
                            <FeatureTitleTable features={this.state.features} />
                    }
                </Container>
            </div>
        );
    }
}