'use client'
import Navbar from "../components/navbar"
import AdminToolBar from "../components/toolbar"
import { Suspense, useEffect, useState } from "react"
import Loading from "@/app/loading"
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import { setAccessToken, setInit, setRole, setUser } from "@/app/state/reducer/authSlice"
import { redirect } from "next/navigation"


export const metadata = {
    title: 'Admin-Dashboard'
}
 

const Layout = ({children})=>{  
    const {status,data} = useSession()
    const dispatch = useDispatch()
    const [isLoading,setLoading] = useState(true)
    useEffect(()=>{
        if(status === "unauthenticated"){
            setLoading(false)
            dispatch(setInit())
            redirect('/login')
        }
        if(status==="authenticated"){
            const {role,isVerified,accessToken,email,fullname,username,profile} = data.user
            setLoading(false)
            dispatch(setRole(role))
            dispatch(setUser({isVerified,email,fullname,username,profile}))
            dispatch(setAccessToken(accessToken))
            if(role==="user"){
                redirect("/requeststore")
            }
            
            
        }
       
    },[status])
    if(isLoading) return <Loading/>
    return <>
    <AdminToolBar/>
    {/*  */}
    <div className="grid fixed basis-full mobile:mt-[90px] mt-[65px] grid-cols-1 mobile:grid-cols-[208px,auto]  w-full">
    <Navbar/>
    {children}
    </div>
    </>
}

export default Layout