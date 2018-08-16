import React, { Component } from 'react';
import logo from '../../logo.svg';
import { MainMenu } from '../Menu/menu';


export class Layout extends Component {

    render() {
       return (
               <div>
               <div className="App">
                   <header className="App-header">
                       <img src={logo} className="App-logo" alt="logo" />
                       <h1 className="App-title">Technificent Communication Component Samples</h1>
                   </header>
                   </div>
                   <div>
                        <MainMenu />
                   </div>
                 
               </div> 
        );
    }
}