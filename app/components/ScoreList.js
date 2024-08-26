"use client"

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '@/utils/firestore';

function ScoreList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            // Fetch documents from 'scores' collection
            const scoresCollection = collection(db, "scores");
            const querySnapshot = await getDocs(scoresCollection);

            // Process each document
            const documents = querySnapshot.docs.map(doc => {
                const docData = doc.data();
                const weekData = docData.week ? docData.week['2024-08-26-2024-09-01'] : null;

                // Calculate the average if weekData is available
                const average = weekData && weekData.mark !== 0
                    ? (weekData.mark / weekData.count).toFixed(2)
                    : null;

                return {
                    id: doc.id,
                    average: average ? parseFloat(average) : null,
                };
            });

            // Sort documents by average in descending order
            documents.sort((a, b) => (b.average || 0) - (a.average || 0));

            setData(documents);
        } catch (err) {
            console.error("Error fetching data: ", err);
            setError(err);
        } finally {
            setLoading(false);
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
            <div>
                {data.length > 0 ? (
                    data.map(doc => (
<>
    <div key={doc.id} className='list-container'>
        <table className='centered-table'>
            <tr>
                <td>{doc.id}</td>
                <td>{doc.average !== null ? doc.average : 'N/A'}</td>
            </tr>
        </table>
    </div>
    <br/>
</>

                    ))
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        </div>
    );
}

export default ScoreList;
