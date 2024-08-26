"use client"

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '@/utils/firestore';

function ScoreList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
                        ? (weekData.count / weekData.mark).toFixed(2)
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

        fetchAllData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div style={{ padding: '30px' }}>
            <h3>Average Scores</h3>
            <div>
                {data.length > 0 ? (
                    data.map(doc => (
                        <div key={doc.id}>
                            <strong>Document ID:</strong> {doc.id}
                            <br />
                            <strong>Average:</strong> {doc.average !== null ? doc.average : 'N/A'}
                            <br /><br />
                        </div>
                    ))
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        </div>
    );
}

export default ScoreList;
