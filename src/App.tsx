import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import InterestSelection from './Routes/Signup/InterestSelection';
import { Box, ThemeProvider } from '@mui/material';
import * as global from "./Resources/GlobalTheme";
import Home from './Routes/Home/Home';

function App() {

  const theme = global.theme;

  return (
    <Box className="App" height={"100vh"} display={"flex"} flexDirection={"column"}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/interests" element={<InterestSelection />} />
          <Route path="/dashboard" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </Box>
  );
}

export default App;
