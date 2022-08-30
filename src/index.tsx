import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import awsconfig from './Resources/aws-exports';
import { Amplify } from 'aws-amplify';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './Resources/GlobalTheme';
import { ThemeProvider } from '@mui/material';
Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ThemeProvider>

);

