'use client';

import { useState } from 'react';
import db from '@/utils/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const login = async () => {
    try {
      const usersCollection = collection(db, 'teacher');
      
      const q = query(usersCollection, where('username', '==', username));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        if (userDoc.password === password) {
          setMessage('Login successful!');
          localStorage.setItem('admin', userDoc.admin)
          localStorage.setItem('user', userDoc.username)
          window.location.href = '/dashboard'
        } else {
          setMessage('Incorrect password.');
        }
      } else {
        setMessage('Username not found.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('An error occurred during login.');
    }
  };

  return (
    <>
      <div className='login-container'>
        <h3>Login</h3>
        <input
          className='login-input'
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br/><br/>
        <input
          className='login-input'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/><br/>
        <button className='verify' onClick={login}>Verify</button>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}

export default Login;
