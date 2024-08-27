import { useState } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import db from '@/utils/firestore';
import { getWeekStartEndDate, formatDate } from '@/utils/dateUtils';

function AddScore() {
  const [classValue, setClassValue] = useState('');
  const [division, setDivision] = useState('');
  const [score, setScore] = useState('');
  const [error, setError] = useState('');

  const { startOfWeek, endOfWeek } = getWeekStartEndDate();
  const weekRange = `${formatDate(startOfWeek)}-${formatDate(endOfWeek)}`;
  const Month = new Date().toLocaleString('default', { month: 'long' }).toLowerCase();
  const currentYear = new Date().getFullYear();
  const currentMonth = `${Month}-${currentYear}`

  const handleAddScore = async () => {
    if (!classValue || !division || !score) {
      setError('All fields are required.');
      return;
    }

    if (score < 0 || score > 10) {
      setError('Score must be between 0 and 10.');
      return;
    }

    if(classValue > 12){
      setError('Invalid Class');
      return;
    }

    if(localStorage.getItem('myclass') == classValue+division.toUpperCase()){
      setError('Cannot grade your class')
      return;
    }

    try {
      const classRef = doc(db, 'scores', classValue+division.toUpperCase());
      const docSnap = await getDoc(classRef);

      const weekData = docSnap.exists() ? docSnap.data().week || {} : {};
      const monthData = docSnap.exists() ? docSnap.data().month || {} : {};
      const yearData = docSnap.exists() ? docSnap.data().year || {} : {};

      const newWeekData = {
        ...weekData,
        [weekRange]: {
          mark: (weekData[weekRange]?.mark || 0) + ((Number(score)/10)*100),
          count: (weekData[weekRange]?.count || 0) + 1,
        },
      };

      const newMonthData = {
        ...monthData,
        [currentMonth]: {
          mark: (monthData[currentMonth]?.mark || 0) + ((Number(score)/10)*100),
          count: (monthData[currentMonth]?.count || 0) + 1,
        },
      };

      const newYearData = {
        ...yearData,
        [currentYear]: {
          mark: (yearData[currentYear]?.mark || 0) + ((Number(score)/10)*100),
          count: (yearData[currentYear]?.count || 0) + 1,
        },
      };

      // Set or update the document in Firestore
      await setDoc(classRef, {
        week: newWeekData,
        month: newMonthData,
        year: newYearData,
      }, { merge: true });

      setError('');

      alert("Score Updated")
    } catch (err) {
      console.error('Error updating score:', err);
      setError('Error updating score.');
    }
  };

  const handleReduceScore = async () => {
    if (!classValue || !division || !score) {
      setError('All fields are required.');
      return;
    }

    if (score < 0 || score > 5) {
      setError('Score must be between 0 and 5.');
      return;
    }

    if(classValue > 12){
      setError('Invalid Class');
      return;
    }

    if(localStorage.getItem('myclass') == classValue+division.toUpperCase()){
      setError('Cannot grade your class')
      return;
    }

    try {
      const classRef = doc(db, 'scores', classValue+division.toUpperCase());
      const docSnap = await getDoc(classRef);

      const weekData = docSnap.exists() ? docSnap.data().week || {} : {};
      const monthData = docSnap.exists() ? docSnap.data().month || {} : {};
      const yearData = docSnap.exists() ? docSnap.data().year || {} : {};

      const newWeekData = {
        ...weekData,
        [weekRange]: {
          mark: (weekData[weekRange]?.mark || 0) - ((Number(score)/5)*100),
          count: (weekData[weekRange]?.count || 0) + 1,
        },
      };

      const newMonthData = {
        ...monthData,
        [currentMonth]: {
          mark: (monthData[currentMonth]?.mark || 0) - ((Number(score)/5)*100),
          count: (monthData[currentMonth]?.count || 0) + 1,
        },
      };

      const newYearData = {
        ...yearData,
        [currentYear]: {
          mark: (yearData[currentYear]?.mark || 0) - ((Number(score)/5)*100),
          count: (yearData[currentYear]?.count || 0) + 1,
        },
      };

      console.log(newWeekData)

      // Set or update the document in Firestore
      await setDoc(classRef, {
        week: newWeekData,
        month: newMonthData,
        year: newYearData,
      }, { merge: true });

      setError('');

      alert("Score Updated")
    } catch (err) {
      console.error('Error reducing score:', err);
      setError('Error reducing score.');
    }
  };

  return (
    <>
      <h3>&nbsp; Add Score</h3>
      <div className='add'>
        <input
          className='score-input'
          type='text'
          placeholder='Class'
          value={classValue}
          onChange={(e) => setClassValue(e.target.value)}
        /> &nbsp;
        <input
          className='score-input'
          type='text'
          placeholder='Division'
          value={division}
          onChange={(e) => setDivision(e.target.value)}
        /><br /><br />
        <input
          className='score-input'
          type='number'
          placeholder='Score'
          value={score}
          onChange={(e) => setScore(e.target.value)}
        /><br /> <br />
        <i>Max value is 10 to Add and 5 to Reduce</i>
        <br/><br />
        <button type='submit' className='addscore' onClick={handleAddScore}>Add Score</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className='removescore' onClick={handleReduceScore}>Reduce Score</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </>
  );
}

export default AddScore;
