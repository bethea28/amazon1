import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import InterestSelection from './Components/Signup/InterestSelection';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/interests" element={<InterestSelection />}/>
      </Routes>
    </div>
  );
}

export default App;
