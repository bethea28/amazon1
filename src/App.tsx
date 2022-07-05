import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useForm} from "react-hook-form";
import { DialogTitle } from '@material-ui/core';
import AddProject from './components/AddProject';

function App() {
  const{register,handleSubmit} = useForm();
  return (
    <div className="App">
    <AddProject/>
      
    </div>
  );
}

export default App;
