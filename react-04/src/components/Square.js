import React from 'react';
import ThemeContext from '../context/ThemeContext';

// https://reactjs.org/tutorial/tutorial.html
function Square(props) {
  const themeCSS = React.useContext(ThemeContext);

  return (
    <button className={`square ${themeCSS.btnBG}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;