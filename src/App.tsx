import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import NotesApp from './pages/NotesApp';
import Spotlight  from './components/Spotlight';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}> 
        <Route path="/" element={<LandingPage />} />
        <Route path="/notes" element={<NotesApp />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;