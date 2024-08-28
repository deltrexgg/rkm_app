'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import AddTeacher from '../components/AddTeacher'
import AddScore from '../components/AddScore'
import TeacherApprove from '../components/TeacherApprove'
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

    return (
        <>
            <div className='dashhead'>
                {user}
                <div className='action-div'>
                    <Link href='/'>Leaderboard</Link> &nbsp;
                    <span onClick={logout} className='logbtn'>Logout</span>
                </div>
            </div>
            <MyClass />
            <AddScore />
            <TBmark />
            {admin && <TeacherApprove />}
        </>
    )
}

export default Dashboard
