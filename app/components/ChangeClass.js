'use client'
import { useState } from "react";
import { collection, query, where, getDocs, doc, updateDoc, getFirestore } from "firebase/firestore";
import db from '@/utils/firestore'; // Make sure this exports the Firestore instance

function ChangeClass() {
    const [email, setEmail] = useState('');
    const [myclass, setClass] = useState('');
    const [mydiv, setDiv] = useState('');

    const handleUpdateClass = async (event) => {
        event.preventDefault();
        try {
            const firestore = getFirestore(); // Get Firestore instance
            const teacherCollection = collection(firestore, "teacher");
            const q = query(teacherCollection, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert("No teacher found with this email.");
                return;
            }

            // Assuming there's only one document per email
            const docSnapshot = querySnapshot.docs[0];
            const docRef = doc(firestore, "teacher", docSnapshot.id);

            // Update the document with new class information
            await updateDoc(docRef, {
                myclass: `${myclass}${mydiv.toUpperCase()}`,
            });

            alert("Class updated successfully!");
            setEmail('')
            setClass('')
            setDiv('')
        } catch (error) {
            console.error("Error updating class: ", error);
            alert("Failed to update class.");
        }
    };

    return (
        <>
            <h3>&nbsp; Change Class</h3>
            <div className="add">
                <input 
                    type='text' 
                    className="score-input" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                /><br /><br />
                <input 
                    type='number' 
                    className="score-input" 
                    placeholder="Class" 
                    value={myclass} 
                    onChange={(e) => setClass(e.target.value)} 
                /> &nbsp;
                <input 
                    type='text' 
                    className="score-input" 
                    placeholder="Division" 
                    value={mydiv} 
                    onChange={(e) => setDiv(e.target.value)} 
                />
                <br /> <br />
                <button 
                    type='submit' 
                    className='addscore' 
                    onClick={handleUpdateClass} // Use onClick to trigger the update
                >
                    Update Class
                </button>
            </div>
        </>
    );
}

export default ChangeClass;
