// App.js
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/home';
import NotFound from './views/not-found';
import RentForm from './RentForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/rent" element={<RentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
