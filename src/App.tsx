import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateUpdatePage from './pages/CreateUpdatePage';
import DisplayPage from './pages/DisplayPage';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DisplayPage />} />
        <Route path="/create-update/:id" element={<CreateUpdatePage />} />
        <Route path="/create-update" element={<CreateUpdatePage />} />
      </Routes>
    </Router>
  );
};

export default App;
