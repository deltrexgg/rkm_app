"use client"

import { useRouter } from "next/navigation"

function HomeHead() {

  const route = useRouter();

  const auth = () => {
    if(!localStorage.getItem('user')){
      route.push('/login')
    }else{
      route.push('/dashboard')
    }
  }

  return (
    <div className="pghead">
        <h3>RK Mission HSS </h3>
            <div className="todash"><button onClick={auth}>Update Score</button></div>
    </div>
  )
}

export default HomeHead
