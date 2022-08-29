import '@aws-amplify/ui-react/styles.css';
import AddProject from './Components/Project/AddProject';
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import InterestSelection from './Components/Signup/InterestSelection';
import { Box } from '@mui/material';
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
import AllProjects from './Components/Project/AllProjects';
import ModifyProject from './Components/Project/ModifyProject';
import Themetesting from './Resources/Themetesting';

function App() {

  return (
    <Box className="App" height={"100vh"} display={"flex"} flexDirection={"column"}>
      <AuthProvider>
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Layout />}>

              {/* public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/theme" element={<Themetesting />} />

              {/* protected routes */}
              <Route element={<RequireAuth />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/addproject" element={<AddProject />} />
                <Route path="/interests" element={<InterestSelection />} />
                <Route path="/allprojects" element={<AllProjects />} />
                <Route path="/allprojects/:id" element={<ModifyProject />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Box>
  );
}
export default App;