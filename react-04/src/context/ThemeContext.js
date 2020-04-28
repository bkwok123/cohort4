import React from 'react';

export const themes = {
    light: {
      foreground: 'ThemeLightFG',
      background: 'ThemeLightBG',
      btnFG: 'ThemeLightBtnFG',
      btnBG: 'ThemeLightBtnBG',
      container: 'ThemeLightBox',
      fill: 'ThemeLightFill',
      stack: 'ThemeLightStack',
      nstack: 'ThemeLightNstack',      
    },
    dark: {
      foreground: 'ThemeDarkFG',
      background: 'ThemeDarkBG',
      btnFG: 'ThemeDarkBtnFG',
      btnBG: 'ThemeDarkBtnBG',
      container: 'ThemeDarkBox',      
      fill: 'ThemeDarkFill',
      stack: 'ThemeDarkStack',
      nstack: 'ThemeDarkNstack',
    },
  };

  const ThemeContext = React.createContext(
    themes.dark // default value
  );

export default ThemeContext;