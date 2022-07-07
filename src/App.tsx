import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import InterestSelection from './Components/Signup/InterestSelection';
import { Box, ThemeProvider } from '@mui/material';
import * as global from "./Resources/GlobalTheme";

function App() {

  const theme = global.theme;

  return (
    <Box className="App" height={"100vh"} display={"flex"} flexDirection={"column"}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/interests" element={<InterestSelection />} />
        </Routes>
      </ThemeProvider>
    </Box>
  );
}

export default App;
