import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CognitoUser } from '@aws-amplify/auth';
import { BrowserRouter } from 'react-router-dom';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import SignIn from './components/Signup';
Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <SignIn authState={'signIn'} loading={false} error={''}/>

      </header>
    </div>
  );
}

export default App;
