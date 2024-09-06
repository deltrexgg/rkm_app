"use client"
 
import { useEffect } from "react";
import HomeHead from "./components/HomeHead";
import { useRouter } from "next/navigation"
export default function Home() {

  const route = useRouter();

  useEffect(() => {
    auth();
  })

  const auth = () => {
    if(!localStorage.getItem('user')){
      route.push('/login')
    }else{
      route.push('/dashboard')
    }
  }
  return (
    <main>
      <HomeHead />
    </main>
  );
}
