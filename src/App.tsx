import React from 'react';
import './App.css';
import { CognitoUser } from '@aws-amplify/auth';
import { BrowserRouter } from 'react-router-dom';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import SignIn from './Components/Signup';
import { Routes, Route } from 'react-router-dom';
import InterestSelection from './Routes/Signup/InterestSelection';
import { Box, ThemeProvider } from '@mui/material';
import * as global from "./Resources/GlobalTheme";
import Profile from './Components/Profile/Profile'
import Home from './Components/Home/Home';
import Signup from './Components/Signup';


Amplify.configure(awsconfig);

function App() {

  const theme = global.theme;

  return (
    // <div className="App">
    //   <header className="App-header">
    //   <SignIn authState={'signIn'} loading={false}/>

    //   </header>
    // </div>
    <Box className="App" height={"100vh"} display={"flex"} flexDirection={"column"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/interests" element={<InterestSelection />} />
      </Routes>
    </Box>
  );
}

export default App;
