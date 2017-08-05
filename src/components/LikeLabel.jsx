import React, { Component } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export default class LikeLabel extends Component {
    render() {
        return (
            <Button
                icon={<Icon name='heart' />}
                label={<Label content={this.props.count} />}
                size="tiny"
                onClick={this.props.handleOnClick}
            />
        );
    }
}