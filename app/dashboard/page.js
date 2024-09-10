'use client'
import React, { useEffect, useState } from 'react'
import AddScore from '../components/AddScore'
import MyClass from '../components/MyClass'
import { useRouter } from 'next/navigation'
import TBmark from '../components/TBmark'

function Dashboard() {

    const route = useRouter();

    const [user, setUser] = useState('')
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        const userFromStorage = localStorage.getItem('user') || 'Username';
        const adminFromStorage = localStorage.getItem('admin') === 'true';

        setUser(userFromStorage);
        setAdmin(adminFromStorage);
    }, [])

    const logout = () => {
        if (confirm("Do you want to logout")) {
            localStorage.clear();
            route.push('/')
        }
    }

    const handleReq = () => {
        route.push('/reqlist');
    }
    const handlescore = () => {
        route.push('/score')
    }
    return (
        <>
            <div className='dashhead'>
                {user}
                <div className='action-div'>
                {admin && (<><button className='reqbtn' onClick={handleReq}>Request</button>&nbsp; 
                <button className='reqbtn' onClick={handlescore}>Score</button></>)} &nbsp;
                    <span onClick={logout} className='logbtn'>Logout</span>
                </div>
            </div>
            <MyClass />
            <AddScore />
            {admin && (<TBmark />)}
            
        </>
    )
}

export default Dashboard
