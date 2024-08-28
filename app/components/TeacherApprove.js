"use client"

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import db from '@/utils/firestore';

function TeacherApprove() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Fetch documents from 'teacherreq' collection
                const querySnapshot = await getDocs(collection(db, "teacherreq"));
                const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                // Set data
                setData(docs);

            } catch (err) {
                console.error("Error fetching data: ", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const removereq = async (id) => {
        try {
            await deleteDoc(doc(db, "teacherreq", id));
            // Optionally: Remove the document from the state after successful deletion
            setData(data.filter(doc => doc.id !== id));
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    const moveDocument = async (id) => {
        try {
            // Fetch document data from source collection
            const sourceDocRef = doc(db, "teacherreq", id);
            const docSnapshot = await getDoc(sourceDocRef); // Corrected method to get document data
            const docData = docSnapshot.data();

            if (!docData) {
                console.error("Document not found.");
                return;
            }

            // Write document data to target collection
            const targetDocRef = doc(db, "teacher", id); // Target collection
            await setDoc(targetDocRef, docData);

            // Delete document from source collection
            await deleteDoc(sourceDocRef);

            // Update the local state to remove the document from the list
            setData(data.filter(doc => doc.id !== id));

        } catch (e) {
            console.error("Error moving document: ", e);
            setError(e);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div style={{ padding: '30px' }}>
            <h3>Teachers Request</h3>
            <div>
                {data.map(doc => (
                    <div key={doc.id}>
                        {doc.email}&nbsp;&nbsp;&nbsp; 
                        <button className='addteachbtn' onClick={() => moveDocument(doc.id)}>+ Add</button> &nbsp;
                        <button className='remteacherbtn' onClick={() => removereq(doc.id)}>Remove</button><br /><br />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeacherApprove;
