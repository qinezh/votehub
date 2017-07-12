import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export default class LikeLabel extends Component {
    render() {
        return (
            <Button
                content='Like'
                icon='heart'
                label={{ as: 'a', basic: true, content: this.props.count }}
                labelPosition='right'
                onClick={this.props.handleOnClick}
            />
        );
    }
}