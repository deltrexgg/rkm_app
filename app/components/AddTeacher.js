"use client"

import { useState } from 'react';
import db from '@/utils/firestore';
import { collection, addDoc } from "firebase/firestore"; 

function AddTeacher() {

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleTeacher = async (event) => {
    event.preventDefault();
    try{
      const docRef = await addDoc(collection(db, "teacher"), {
        username : user,
        password : pass,
        admin : false,
      });
    } catch (e) {
      console.error("Error adding teacher : ", e)
    }
  }

  return (
    <>
            <h3>&nbsp; Add Teacher</h3>
    <form className='add' onSubmit={handleTeacher}>
        <input className='teacher-input' type='text' placeholder='usename' value={user} onChange={(e) => setUser(e.target.value)} /><br/><br/>
        <input className='teacher-input' type='text' placeholder='password' value={pass} onChange={(e) => setPass(e.target.value)} /><br/><br/>
        <button type='submit' className='addteach'>Add</button> 
    </form>
    </>
  )
}

export default AddTeacher