'use client'
import Navbar from "../components/navbar"
import AdminToolBar from "../components/toolbar"
import {  useEffect, useState } from "react"
import Loading from "@/app/loading"
import {  useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import { setAccessToken, setInit, setRole, setUser } from "@/app/state/reducer/authSlice"
import { redirect } from "next/navigation"
import { isExpired } from "@/app/lib/utils/utils"


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
           if( isExpired({expires:data.expires})){
           // console.log("Expired");
           }else{
           // console.log("Not Expire");
           }
            const {role,isVerified,accessToken,email,fullname,username,profile} = data.user
            setLoading(false)
            dispatch(setRole(role))
            dispatch(setUser({isVerified,email,fullname,username,profile}))
            dispatch(setAccessToken(accessToken))
            if(role==="user"){
               // redirect("/requeststore")
            }
        }
       
    },[status,data])
    if(isLoading) return <Loading/>
    return <div className="relative">
    <AdminToolBar/>
    {/*  */}
    <div className="grid fixed basis-full mobile:mt-[90px] mt-[65px] grid-cols-1 mobile:grid-cols-[208px,auto]  w-full">
    <Navbar/>
    {children}
    </div>
    </div>
}

export default Layout