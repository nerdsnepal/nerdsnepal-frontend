'use client'
import Navbar from "../components/navbar"
import AdminToolBar from "../components/toolbar"
import { Suspense, useEffect, useState } from "react"
import Loading from "@/app/loading"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const Layout = ({children})=>{  
    const {status,data} = useSession()
    const [isLoading,setLoading] = useState(true)
    console.log(data);
    useEffect(()=>{
        if(status === "unauthenticated"){
            setLoading(false)
            redirect('/login')
        }
        if(status==="authenticated")
        setLoading(false)
    },[status])
    if(isLoading) return<Suspense fallback={<Loading/>}/>
    return <><Suspense fallback={<Loading/>}>
    <AdminToolBar/>
    <div className="grid basis-full mobile:my-[90px] my-[65px] grid-cols-1 mobile:grid-cols-2 fixed w-full">
    <Navbar/>
    {children}
    </div>
    </Suspense>
    </>
}

export default Layout