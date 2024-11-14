// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AddChildRecord from './components/AddChildRecord';
import Home from './components/Home';
import AddDailyUpdate from './components/AddDailyUpdate';
import AddChildAndParentRecord from './components/AddChildAndParentRecord';
import SendSummary from './components/SendSummary';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });
  }, []);

  return (
    <Router>
      <Routes>
        {loggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/add-child" element={<AddChildAndParentRecord />} />
            <Route path="/daily-updates" element={<AddDailyUpdate/>} />
            <Route path="/add-daily-update/:childId" element={<AddDailyUpdate />} />
            <Route path="/child-parent-management" element={<AddChildAndParentRecord/>} />
            <Route path="/send-summary" element={<SendSummary/>} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login onLoginSuccess={setLoggedIn} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
