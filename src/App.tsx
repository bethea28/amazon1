import React from "react";
import AppbarPrivate from "./Components/Navbar/AppbarPrivate";
import AppbarPublic from "./Components/Navbar/AppbarPublic";
import logo from './logo.svg';
import './App.css';
import { CognitoUser } from '@aws-amplify/auth';
import { BrowserRouter } from 'react-router-dom';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import SignIn from './Components/Signup';
Amplify.configure(awsconfig);

export default function App() {
  const userLoggedIn = false
  return (
    // userLoggedIn ? <AppbarPrivate /> : <AppbarPublic />
    <div className="App">
      <header className="App-header">
      <SignIn authState={'signIn'} loading={false}/>

      </header>
    </div>
  );
}
