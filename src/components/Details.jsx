import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import LikeLabel from './LikeLabel';
import VoteApi from '../api/voteApi';

export default class Details extends Component {
    constructor(props) {
        super(props);
        const id = this.props.match.params.id;

        this.state = {
            "id": id,
            "feature": VoteApi.getItemById(id)
        }
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.setState({
            "feature": {
                "id": this.state.feature.id,
                "count": this.state.feature.count + 1,
                "title": this.state.feature.title
            }
        });
        VoteApi.addCount(this.state.id);
    }

    render() {
        return (
            <div className='details'>
                <Header as='h2'>
                    {this.state.feature.title}
                </Header>
                <LikeLabel count={this.state.feature.count} handleOnClick={this.handleOnClick}/>
            </div>
        );
    }
}