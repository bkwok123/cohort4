import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyComponent from './components/MyComponent';
import EvenComponent from './components/EvenComponent';
import OddComponent from './components/OddComponent';

class App extends Component {

    constructor() {
      super();
      this.counter = 21;
      this.state = {
        myState: "TBD"
      };  
    }

    onPushMe = () => {
      console.log("You pushed me");

      this.setState({
        myState: "now:" + ++this.counter
      });  
    }  

   render() {

      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" /> 
            <button onClick={this.onPushMe}>
              Push Me
            </button>

            <h1>I am in control of this application and my name is Bob {this.counter} {this.state.myState}.</h1>       
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <MyComponent whatToSay="What Ever" passmethod = {this.onPushMe}/>

            
            {(this.counter%2 === 0) ? <EvenComponent/> : <OddComponent/>}

          </header>
        </div>);
    }
}

export default App;
