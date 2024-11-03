"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import db from '@/utils/firestore';

function TeachersList() {
    const router = useRouter();
    const [teachersByClass, setTeachersByClass] = useState({});

    const handleGoBack = () => {
        router.push('/dashboard');
    }

    const getTeachers = async () => {
        try {
            const teachersCollection = collection(db, "teacher");
            const querySnapshot = await getDocs(teachersCollection);
            const teachersData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            
            // Group teachers by class
            const groupedByClass = teachersData.reduce((acc, teacher) => {
                const className = teacher.myclass;
                if (!acc[className]) {
                    acc[className] = [];
                }
                acc[className].push(teacher);
                return acc;
            }, {});

            setTeachersByClass(groupedByClass);
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    };

    useEffect(() => {
        getTeachers();
    }, []);

    // Sort class names alphanumerically (e.g., "1A", "1B", ..., "12A", "12B")
    const sortedClassNames = Object.keys(teachersByClass).sort((a, b) => {
        const [numA, letterA] = [parseInt(a), a.slice(-1)];
        const [numB, letterB] = [parseInt(b), b.slice(-1)];
        
        if (numA === numB) {
            return letterA.localeCompare(letterB);
        }
        return numA - numB;
    });

    const removeTeacher = async (id, className) => {
        if (confirm("Do you want to remove this teacher")){
            try {
                await deleteDoc(doc(db, "teacher", id));
                
                // Update the state by removing the teacher from the specific class array
                setTeachersByClass((prevTeachers) => {
                    const updatedClass = prevTeachers[className].filter((teacher) => teacher.id !== id);
                    
                    // Create a new state object with the updated class
                    return {
                        ...prevTeachers,
                        [className]: updatedClass
                    };
                });
            } catch (error) {
                console.error("Error deleting teacher:", error);
            }
        }
    };
    

    return (
<>
            <div className='dashhead'>Teacher's List
                <div className='action-div'>
                    <button className='reqbtn' onClick={handleGoBack}>Go Back</button>
                </div>
            </div>       
         <div className="teachers-list-container">
            {sortedClassNames.map((className) => (
                <div key={className} className="class-group">
                    <div className="teachers-grid">
                        {teachersByClass[className].map((teacher) => (
                            <div key={teacher.id} className="teacher-card">
                                <h3>{teacher.username}</h3>
                                <p><strong>Email:</strong> {teacher.email}</p>
                                <p><strong>Class:</strong> {teacher.myclass}</p>
                                <button onClick={() => removeTeacher(teacher.id, className)}>Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <style jsx>{`
                .teachers-list-container {
                    padding: 20px;
                }

                .class-group {
                    margin-bottom: 30px;
                }
                .teachers-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 20px;
                }
                .teacher-card {
                    background-color: #f9f9f9;
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
                .teacher-card h3 {
                    margin-top: 0;
                }
            `}</style>
        </div></>
    );
}

export default TeachersList;
