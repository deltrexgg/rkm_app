'use client'

import React from 'react'
import TeacherApprove from '../components/TeacherApprove';
import { useRouter } from 'next/navigation'
function Reqlist() {

    const route = useRouter();

    const handlegoback = () => {
        route.push('/dashboard')
    }
  return (
<>
<div className='dashhead'>
                <div className='action-div'>
                    <button className='reqbtn' onClick={handlegoback}>Go Back</button>
                </div>
            </div>
<div className='add'>
        <TeacherApprove />
    </div>
    </>
  )
}

export default Reqlist;