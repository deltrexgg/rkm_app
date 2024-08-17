import { useState } from 'react';
import db from '@/utils/firestore';
import { collection, addDoc } from "firebase/firestore"; 

function AddScore() {
  return (
    <>
    <h3>&nbsp; Add Score</h3>
<div className='add'>

<input className='score-input' type='text' placeholder='Class' /> &nbsp;
<input className='score-input' type='text' placeholder='Division' /><br/><br/>
<input className='score-input' type='number' placeholder='Score'/> max value is 10 <br/><br/>
<button className='addscore'>Add Score</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<button className='removescore'>Reduce Score</button>
</div>
</>
  )
}

export default AddScore