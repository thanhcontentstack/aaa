import React from 'react';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#fff',
    }, 
    secondary: {
      main: '#4470bf',
    },
  },
};

const theme = createTheme(themeOptions);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    
  </ThemeProvider>
    ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
