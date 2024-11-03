'use client';

import { useState } from 'react';
import Link from 'next/link';
import db from '@/utils/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import HomeHead from '../components/HomeHead';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const route = useRouter()

  const login = async () => {
    try {
      const usersCollection = collection(db, 'teacher');
      
      const q = query(usersCollection, where('email', '==', email.toLowerCase()));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        if (userDoc.password === password) {
          setMessage('Login successful!');
          localStorage.setItem('admin', userDoc.admin)
          localStorage.setItem('user', userDoc.username)
          localStorage.setItem('email', userDoc.email)
          localStorage.setItem('myclass', userDoc.myclass)
          route.push('/dashboard')
        } else {
          setMessage('Incorrect password.');
        }
      } else {
        setMessage('Email not found.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('An error occurred during login.');
    }
  };

  return (
    <><HomeHead />
    <div className='qoute'>
    <i>Clean surroundings are my right.. Keeping it clean is my responsibility.</i>
    </div>
      <div className='login-container'>
        <h3>Login</h3>
        <input
          className='login-input'
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <br /><br />
        <Link href='/register'>No Account ? Register Here</Link>
      </div>
    </>
  );
}

export default Login;
