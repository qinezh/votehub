import React, { Component } from 'react';
import { Header, Divider, Loader, Container } from 'semantic-ui-react';
import * as Toastr from 'toastr';
import LikeLabel from './LikeLabel';
import VoteApi from '../api/voteApi';
import Navbar from './Navbar';

export default class Details extends Component {
    constructor(props) {
        super(props);
        const topicId = this.props.match.params.id;

        this.state = {
            loading: true,
            topicId: topicId
        }
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
                                <LikeLabel count={this.state.count} topicId={this.state.topicId}/>
                                <Divider />
                                <p> {this.state.description} </p>
                            </Container>
                    }
                </Container>
            </div>
        );
    }
}