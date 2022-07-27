
import '@aws-amplify/ui-react/styles.css';
import awsmobile from './aws-exports';
import { green } from '@material-ui/core/colors';
import { createTheme } from '@mui/material/styles';
import AddProject from './pages/Projects/AddProject'
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
import Profile from './Components/Profile/Profile'
import Home from './Components/Home/Home';
import Dashboard from './Routes/Dashboard/Dashboard';
import { theme } from './Resources/GlobalTheme';
import Signup from './Components/Signup';
import Login from './Components/Login';

Amplify.configure(awsconfig);

function App() {

  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       light: '#757ce8',
  //       main: '#90D86F',
  //       dark: green[600],
  //     }
  //   },
  // })
  return (
    <Box className="App" height={"100vh"} display={"flex"} flexDirection={"column"}>
      <ThemeProvider theme = {theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/interests" element={<InterestSelection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addproject" element={<AddProject />} />
      </Routes>
      </ThemeProvider>
    </Box>
  );
}
export default App;