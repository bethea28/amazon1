import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { createTheme, DialogTitle } from '@material-ui/core';
import Projects from './pages/Projects/Projects';
import {Amplify} from 'aws-amplify';
import {withAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsmobile from './aws-exports';

Amplify.configure(awsmobile);

function App(props:any) {
  
  
  return (
    <div className="App">

    <Projects/>

    </div>
  );
}

export default withAuthenticator(App);
