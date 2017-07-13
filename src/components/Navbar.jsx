import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

export default class Navbar extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state;

        return (
            <Segment inverted>
                <Menu inverted pointing secondary>
                    <Menu.Item as={Link} to='/' name='home' link active={activeItem === 'home'} onClick={this.handleItemClick} />
                    <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
                    <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick} />
                    <Menu.Menu position='right'>
                        <Menu.Item name='login' active={activeItem === 'login'} onClick={this.handleItemClick} />
                    </Menu.Menu>
                </Menu>
            </Segment>
        );
    }
}