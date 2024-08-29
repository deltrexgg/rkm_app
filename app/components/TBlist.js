"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '@/utils/firestore';
import { getWeekStartEndDate, formatDate } from '@/utils/dateUtils'; // Ensure these functions are correctly implemented
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
function TBlist() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [optBranch, setOptBranch] = useState('week');
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        fetchData();
    }, [selectedDate, optBranch]);

    const formatToAPIFormat = (date) => {
        if (optBranch === 'month') {
            return format(date, 'MMMM-yyyy').toLowerCase();
        } else if (optBranch === 'week') {
            const { startOfWeek, endOfWeek } = getWeekStartEndDate(date); // Use the utility function
            return `${formatDate(startOfWeek)}-${formatDate(endOfWeek)}`;
        }else if(optBranch === 'year'){
            return format(date, 'yyyy')
            console.log(date)
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const dataRange = formatToAPIFormat(selectedDate);

            // Fetch documents from 'scores' collection
            const scoresCollection = collection(db, "tiebreaker");
            const querySnapshot = await getDocs(scoresCollection);

            // Process each document
            const documents = querySnapshot.docs.map(doc => {
                const docData = doc.data();
                const branchData = docData[optBranch] || {};
                const dataForRange = branchData[dataRange] || null;

                // Calculate the average if dataForRange is available
                const average = dataForRange && dataForRange.mark !== 0
                    ? (dataForRange.mark / dataForRange.count).toFixed(2)
                    : null;

                return {
                    id: doc.id,
                    average: average ? parseFloat(average) : 0,
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

    const getDateFormat = () => {
        if (optBranch === 'week') {
            return 'dd-MM-yyyy';
        } else if (optBranch === 'month') {
            return 'MMMM yyyy';
        } else if (optBranch === 'year') {
            return 'yyyy';
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
                <select
                className='selector'
                    id="branchSelect"
                    value={optBranch}
                    onChange={(e) => {
                        const selectedBranch = e.target.value;
                        setOptBranch(selectedBranch);
                        setSelectedDate(new Date()); // Reset date when branch changes
                    }}
                >
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                </select>
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                <DatePicker
                className='selector'
                    id="datePicker"
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    //dateFormat={optBranch === 'week' ? 'dd-MM-yyyy' : 'MMMM yyyy'}
                    dateFormat={getDateFormat()}
                    showMonthYearPicker={optBranch === 'month'}
                    showWeekNumbers={optBranch === 'week'}
                    showYearPicker={optBranch === 'year'}
                />
            </div><br />

            <div>
                {data.length > 0 ? (
                    data.map(doc => (
                        <div key={doc.id} >
                            <table className='centered-table'>
                                <tbody>
                                    <tr>
                                        <td>{doc.id}</td>
                                        <td>{doc.average !== null ? doc.average : 'N/A'}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <br/>
                        </div>
                    ))
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        </div>
    );
}

export default TBlist