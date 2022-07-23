<<<<<<< HEAD
import './App.css';
import Box from '@mui/material/Box';
import AvatarUploadField from './Components/AvatarUploadField';
=======
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import InterestSelection from './Routes/Signup/InterestSelection';
import { Box } from '@mui/material';
import Profile from './Components/Profile/Profile'
import Home from './Components/Home/Home';
import Dashboard from './Routes/Home/Dashboard';
>>>>>>> 3d914ed9cb7d4effc871e2073cf3a3cf8a05db88

function App() {

  return (
<<<<<<< HEAD
      <Box className="App">
        <AvatarUploadField />
      </Box>
=======
    <Box className="App" height={"100vh"} display={"flex"} flexDirection={"column"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/interests" element={<InterestSelection />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Box>
>>>>>>> 3d914ed9cb7d4effc871e2073cf3a3cf8a05db88
  );
}

export default App;
