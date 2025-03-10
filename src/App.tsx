import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Dashboard from './pages/Dashboard';
import TestGenerator from './pages/TestGenerator';
import TestTaking from './pages/TestTaking';
import TestHistory from './pages/TestHistory';
import Analysis from './pages/Analysis';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="generate" element={<TestGenerator />} />
            <Route path="test/:id" element={<TestTaking />} />
            <Route path="history" element={<TestHistory />} />
            <Route path="analysis/:id" element={<Analysis />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;