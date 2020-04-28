import React from 'react';
import ThemeContext from '../context/ThemeContext';
import { ReactSvgInjector, Mutate } from "react-svg-injector";
import logo from '../images/logo.svg';
import '../CSS/Home.css';

function App() {
  const themeCSS = React.useContext(ThemeContext);

  return (
    <div className={`App ${themeCSS.background}`}>
      <header className="App-header">

        <ReactSvgInjector src={logo} className="App-logo" alt="logo">
          <Mutate selector="path" class={themeCSS.fill} />
          <Mutate selector="circle" class={themeCSS.fill} />
        </ReactSvgInjector>          
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>
  );
}

export default App;
