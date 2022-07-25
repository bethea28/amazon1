import React from 'react';
import './App.css';
import { CognitoUser } from '@aws-amplify/auth';
import { BrowserRouter } from 'react-router-dom';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import SignIn from './Components/Signup';
import { Routes, Route } from 'react-router-dom';
import InterestSelection from './Routes/Signup/InterestSelection';
import { Box } from '@mui/material';
import Profile from './Components/Profile/Profile'
import Home from './Components/Home/Home';
import Dashboard from './Routes/Dashboard/Dashboard';
import Signup from './Components/Signup';
import Login from './Components/Login';

Amplify.configure(awsconfig);

function App() {

  return (
    <Box className="App" height={"100vh"} display={"flex"} flexDirection={"column"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/interests" element={<InterestSelection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Box>
  );
}

export default App;
