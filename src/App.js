import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import UserProfile from './Components/UserProfile';
import UserDir from './Components/UserDir';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserDir/>} />
        <Route path="/user/:userId" element={<UserProfile/>} />
      </Routes>
    </Router>
  );
}

export default App;