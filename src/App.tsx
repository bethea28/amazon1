import React from 'react';
import logo from './logo.svg';
import './App.css';

import { createTheme, DialogTitle } from '@material-ui/core';
import AddProject from './components/AddProject';
import Projects from './pages/Projects/Projects';


function App() {
  
  return (
    <div className="App">
    <AddProject/>
    <Projects/>
  
      
    </div>
  );
}

export default App;
