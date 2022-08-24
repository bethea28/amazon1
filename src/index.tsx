import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import awsconfig from './Resources/aws-exports';
import { Amplify, Auth } from 'aws-amplify';
import { BrowserRouter } from 'react-router-dom';
Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <BrowserRouter>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </BrowserRouter>

);

