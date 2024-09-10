"use client"

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import db from '@/utils/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import HomeHead from '../components/HomeHead';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [division, setDivision] = useState('');
    const [myclass, setMyclass] = useState('');

    const router = useRouter();

    const isValidEmail = (email) => {
        // Regular expression for validating email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const register = async (event) => {
        event.preventDefault();
        
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (!isValidEmail(email)) {
            alert("Wrong Email Format");
            return;
        }

        // Set default values if myclass or division is empty
        const formattedClass = myclass ? myclass : "";
        const formattedDivision = division ? division.toUpperCase() : "";
        
        try {
            const docRef = await addDoc(collection(db, "teacherreq"), {
                username: username,
                password: password,
                email: email,
                admin: false,
                myclass: formattedClass + formattedDivision
            });
            console.log("Document written with ID: ", docRef.id);
            router.push('/')

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <>
            <HomeHead />
            <div className='login-container'>
                <h3>Register</h3>
                <input
                    className='login-input'
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br/><br/>
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
                <input
                    className='login-input'
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                /><br/><br/>
                <i>(*If you have class charge or leave it blank)</i>
                <input
                    className='login-input'
                    type='number'
                    placeholder='Class'
                    value={myclass}
                    onChange={(e) => setMyclass(e.target.value)}
                /><br/><br/>
                <input
                    className='login-input'
                    type='text'
                    placeholder='Division'
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                /><br/><br/>
                <button className='verify' onClick={register}>Apply</button>
                <br/> <br />
                <Link href='/'>Go back</Link><br/><br/>
                <i>After registration wait for the Admin approval for Login</i>
            </div>
        </>
    );
}

export default Register;
