'use client'
import React, { useEffect, useState } from 'react'

function MyClass() {
  const [classValue, setClassValue] = useState('');
  const [division, setDivision] = useState('');

  const [myclass, setMyclass] = useState();

  useEffect(() => {
    handleClass();
  },[])

  const handleClass = async () => {
    if(!localStorage.getItem('myclass')){
        setMyclass(false)
    }else{
        setMyclass(true)
    }
  } 

  const handleDelete = async () => {
    localStorage.removeItem('myclass')
    handleClass();
  }

    const handleClick = async () => {
        localStorage.setItem('myclass',classValue+division.toUpperCase())
        handleClass();
    }
  return (
    <>
    {myclass && (<div className='add'>
        My Class : {localStorage.getItem('myclass')} &nbsp;
         <button style={{backgroundColor:'chartreuse', borderRadius:'7px', padding:'4px'}} onClick={handleDelete} >Change</button>
    </div>)}
    {!myclass && (<div className='add'>
        <i>Add your class</i>
        <br/>
        <input className='score-input' type='number' placeholder='Class' value={classValue} onChange={(e) => setClassValue(e.target.value)}/>:
        <input className='score-input' type='text' placeholder='Division' value={division} onChange={(e) => setDivision(e.target.value)} />&nbsp;
        <button style={{backgroundColor:'white', borderRadius:'7px', padding:'6px'}} onClick={handleClick}>My Class</button>
    </div>)}
    </>
  )
}

export default MyClass