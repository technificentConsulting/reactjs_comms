import React, { Component } from 'react';

export class Login extends Component {
    constructor(props){
        super(props);

        this.state ={
            isLoggedIn: false,
            data: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        let resP = "";

        const headers = new Headers();
        headers.append("Access-Control-Allow-Origin", "*");

        resP = fetch('https://cors-test.appspot.com/test',
        {
            method: "POST",
            headers: headers,
            mode: 'cors',
           // credentials: "same-origin",
           // cache: "no-cache"

        }).then((response) => {
            
            if (response.ok){
                return response.text();
            }
        }).then((data)=>{ 
            if (data) {
                this.updateState(data);
            }
            return data;
        }).catch((err) => { console.log("error logging in "+ err)});

    }

    updateState(data){
        this.setState({ isLoggedIn: true, data: data });
    }

    render(){
         return(
             <div className="componentView">
             
             <h2>Login</h2>
              <div className="cWindow">Logged In? {this.state.isLoggedIn} response is {this.state.data}</div>
             
             
                <input type="button" onClick={this.handleSubmit} value="Login" />
             </div>
        );
    }
}