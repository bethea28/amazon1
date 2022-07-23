import './App.css';
import AvatarUploadField from './Components/AvatarUploadField';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import InterestSelection from './Routes/Signup/InterestSelection';
import { Box } from '@mui/material';
import Profile from './Components/Profile/Profile'
import Home from './Components/Home/Home';
import Dashboard from './Routes/Home/Dashboard';

function App() {

  return (
      
    <Box className="App" height={"100vh"} display={"flex"} flexDirection={"column"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/interests" element={<InterestSelection />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Box className="Avatar Field">
        <AvatarUploadField />
      </Box>
    </Box>
  );
}

export default App;
