import React from 'react';
import logo from './logo.svg';
import './App.css';
import AvatarUploadField from './components/AvatarUploadField';
import Box from '@mui/material/Box';

function App() {
  return (
      <Box className="App">
        <AvatarUploadField />
      </Box>
  );
}

export default App;
