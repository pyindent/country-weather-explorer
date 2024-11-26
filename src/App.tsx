// src/App.tsx  
import React from 'react';  
import { Routes, Route } from 'react-router-dom';  
import Home from './pages/Home';  
import Country from './pages/Country';

const App: React.FC = () => {  
  return (  
    <Routes>  
      <Route path="/" element={<Home />} />  
      <Route path="/country/:code" element={<Country />} />  
    </Routes>  
  );  
};

export default App;