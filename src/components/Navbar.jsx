import React, { Component } from 'react';
import { Menu, Segment, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'home',
            isLogin: props.isLogin || false,
        };
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
        const userName = localStorage.getItem("userName");
        const id = localStorage.getItem("id");
        const isLogin = !!userName && !!id;

        this.setState({
            userName,
            isLogin,
        });
    }

    logout() {
        localStorage.removeItem("userName");
        localStorage.removeItem("id");
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });
    handleLogoutClick = (e, data) => {
        this.setState({ isLogin: false });
        this.logout();
    }

    render() {
        const { activeItem } = this.state;

        return (
            <Segment inverted>
                <Menu inverted pointing secondary>
                    <Menu.Item as={Link} to={process.env.PUBLIC_URL + '/'} name='home' link active={activeItem === 'home'} onClick={this.handleItemClick} />
                    <Menu.Menu position='right'>
                        {
                            this.state.isLogin ?
                                <Dropdown text={this.state.userName} className='link item'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to={process.env.PUBLIC_URL + '/create'}>Create Feature</Dropdown.Item>
                                        <Dropdown.Item onClick={this.handleLogoutClick}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                :
                                <Menu.Item name='login' href={''} />
                        }
                    </Menu.Menu>
                </Menu>
            </Segment>
        );
    }
}