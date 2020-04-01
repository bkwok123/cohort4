import React from 'react';
import Svg from './components/Svg';
import logo from './logo.svg';
import coronavirus from  './coronavirus.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <link rel="shortcut icon" type="image/png" href="./coronavirus.svg" />

      <header className="App-header">
        <Svg/>
        <img src={logo} className="App-logo" alt="logo" />
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
      </header>
    </div>
  );
}

export default App;
