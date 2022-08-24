import '@aws-amplify/ui-react/styles.css';
import { createTheme } from '@mui/material/styles';
import AddProject from './Components/Project/AddProject';
import React from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';
import awsconfig from './Resources/aws-exports';
import { Routes, Route } from 'react-router-dom';
import InterestSelection from './Components/Signup/InterestSelection';
import { Box, ThemeProvider } from '@mui/material';
import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import SignUp from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import UserProfile from './Components/UserProfile/UserProfile'
import { AuthProvider } from './Context/AuthProvider'
import RequireAuth from './Services/Authentication/RequireAuth'
import Layout from './Services/Authentication/Layout';
import PersistLogin from './Services/Authentication/PersistLogin';
import ProjectDetails from './Components/Project/ProjectDetails';
Amplify.configure(awsconfig);

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        light: '#A6BBA7',
        main: '#90D86F',
        dark: '#335436',
      }
    },
  })
  return (
    <Box className="App" height={"100vh"} display={"flex"} flexDirection={"column"}>
      <ThemeProvider theme = {theme}>
        <AuthProvider>
          <Routes>
            <Route element={<PersistLogin/>}>
              <Route path="/" element={<Layout/>}>
              
                {/* public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />

                {/* protected routes */}
                  <Route element={<RequireAuth/>}>
                    <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/profile" element={<UserProfile /> } />
                      <Route path="/addproject" element={<AddProject />} />
                      <Route path="/interests" element={<InterestSelection />} />
                      <Route path="/project-details" element={<ProjectDetails />} />
                    </Route>
                  </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Box>
  );
}
export default App;