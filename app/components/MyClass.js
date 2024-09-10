'use client'

import { useEffect, useState } from "react";

function MyClass() {
  const [classValue, setClass] = useState('');

  useEffect(() => {
    myclass()
  },[])

  const myclass = () =>{
    setClass("My class : "+localStorage.getItem('myclass'))
  }

  return (
    <>
    <div className="add">
      {classValue}
    </div>
    </>
  );
}

export default MyClass