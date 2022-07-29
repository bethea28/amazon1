import { useState, useEffect } from 'react';
import '@aws-amplify/ui-react/styles.css';
import { green } from '@material-ui/core/colors';
import { createTheme } from '@mui/material/styles';
import AddProject from './pages/Projects/AddProject'
import React from 'react';
import './App.css';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Routes, Route } from 'react-router-dom';
import InterestSelection from './Routes/Signup/InterestSelection';
import { Box, ThemeProvider } from '@mui/material';
import * as global from "./Resources/GlobalTheme";
import Home from './Components/Home/Home';
import Dashboard from './Routes/Dashboard/Dashboard';
import SignUp from './Components/Signup';
import Login from './Components/Login';
import UserProfile from './Components/UserProfile/UserProfile'
import { AuthProvider } from './Context/AuthProvider'
import RequireAuth from './Components/RequireAuth'
import AppbarPublic from './Components/Navbar/AppbarPublic';
import Layout from './Layout';
import PersistLogin from './PersistLogin';

Amplify.configure(awsconfig);

function App() {

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
    <Box className="App" height={"100vh"} display={"flex"} flexDirection={"column"}>
      <ThemeProvider theme = {theme}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout/>}>
              {/* public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />

              {/* protected routes */}
              <Route element={<PersistLogin/>}>
                <Route element={<RequireAuth/>}>
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/interests" element={<InterestSelection />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/addproject" element={<AddProject />} />
                </Route>
              </Route>
              
              {/* catch all */}
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Box>
  );
}
export default App;