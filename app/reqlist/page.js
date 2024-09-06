'use client'

import React from 'react'
import TeacherApprove from '../components/TeacherApprove';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
function Reqlist() {

    const route = useRouter();

    const handlegoback = () => {
        route.push('/dashboard')
    }
  return (
<>
<div className='dashhead'>
                <div className='action-div'>
                    <button onClick={handlegoback}>Go Back</button>
                </div>
            </div>
<div className='add'>
        <TeacherApprove />
    </div>
    </>
  )
}

export default Reqlist;