import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Home } from '../../routes/home';
import { Chat } from '../../routes/chat';
import { Media } from '../../routes/media';
import { Login } from '../../routes/login';
import { TheWhiteboard } from '../../routes/whiteboard';
import Menu, { MenuItem } from 'rc-menu';
import 'rc-menu/assets/index.css';

export class MainMenu extends Component {


    render() {
        const center = {
            textAlign: center,
            margin: '0 auto 20px 0'
        };

        return(
            <div>
                <nav>
                    <Menu className={'textAlign: center  margin: 0 auto'} mode="horizontal">
                        <MenuItem ><Link to='/home'>Home</Link></MenuItem>
                        <MenuItem ><Link to='/chat'>Chat</Link></MenuItem>
                        <MenuItem ><Link to='/media'>Video</Link></MenuItem>
                        <MenuItem ><Link to='/whiteboard'>TheWhiteboard</Link></MenuItem>
                        <MenuItem ><Link to='/login'>Login</Link></MenuItem>                        
                    </Menu>
                </nav>
                
                <Route exact path='/home' component={Home} />
                <Route exact path='/chat' component={Chat} />
                <Route exact path='/media' component={Media} />
                <Route exact path='/whiteboard' component={TheWhiteboard} />
                <Route exact path='/login' component={Login} />
            </div>

        );
    }

}