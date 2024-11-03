'use client'
import React from 'react';
import ScoreList from '../components/ScoreList';
import { useRouter } from 'next/navigation';


function Score() {

    const route = useRouter();

    const goback = () => {
        route.push('/dashboard');
    }
    return(
        <>
        <div className='dashhead'>
            <div className='action-div'>
            <button className='reqbtn' onClick={goback} >Go back</button>
            </div>
        </div>
        <ScoreList />
        </>
    )
}

export default Score;
