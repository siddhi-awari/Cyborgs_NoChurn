import React from 'react';
import { Routes, Route } from 'react-router-dom';  
import Navbar from './components/Navbar';  
import Dashboard from './components/Dashboard';  
import PredictionForm from './components/PredictionForm';  

const App = () => {
  return (
    <div>
      <Navbar /> {/* Navbar for navigation */}
      
      <Routes>
        <Route path="/" element={<PredictionForm />} /> {/* Set PredictionForm as home page */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;