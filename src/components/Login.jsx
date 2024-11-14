// src/components/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess(true); // Pass true to indicate successful login
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/your/background-image.jpg)' }}>
      <div className="bg-white/80 rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src="/path/to/giraffe-icon.png" alt="Giraffe Icon" className="w-16 h-16 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700">Sign Up</h2>
        </div>
        <input 
          type="email" 
          placeholder="Username" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="mb-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <button 
          onClick={handleLogin} 
          className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition duration-300"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm text-gray-500">
          <a href="#" className="text-purple-500 hover:underline">Forget Password?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
