"use client"

function HomeHead() {

  const auth = () => {
    if(!localStorage.getItem('user')){
      window.location.href = '/login'
    }else{
      window.location.href = '/dashboard'
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
