import React, { useState } from 'react';
import './App.css';
import { DialogTitle } from '@material-ui/core';
import Projects from './pages/Projects/Projects';
import {Amplify} from 'aws-amplify';
import {withAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsmobile from './aws-exports';
import {ThemeProvider} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { createTheme } from '@mui/material/styles';
import AddProject from './pages/Projects/AddProject'

Amplify.configure(awsmobile);

function App(props:any) {
    const theme = createTheme({
        palette: {
          primary: {
            light: '#757ce8',
            main: '#90D86F',
            dark: green[600],
            
          }
        },
        
      })
  
    return (
      <div className="App">
      <ThemeProvider theme = {theme}>
        <AddProject/>
      </ThemeProvider>
      

      </div>
    );
}

export default withAuthenticator(App);
