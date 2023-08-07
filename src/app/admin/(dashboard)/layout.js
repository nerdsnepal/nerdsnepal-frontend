'use client'
import Navbar from "../components/navbar"
import AdminToolBar from "../components/toolbar"
import { Suspense, useEffect, useState } from "react"
import Loading from "@/app/loading"
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import { setAccessToken, setInit, setRole } from "@/app/state/reducer/authSlice"

const Layout = ({children})=>{  
    const {status,data} = useSession()
    const dispatch = useDispatch()
    const [isLoading,setLoading] = useState(true)
    useEffect(()=>{
        if(status === "unauthenticated"){
            setLoading(false)
            dispatch(setInit())
           // redirect('/login')
        }
        if(status==="authenticated"){
            const {role,isVerified,accessToken} = data.user
            setLoading(false)
            dispatch(setRole(role))
            dispatch(setAccessToken(accessToken))
            if(role==="user"){
              //  redirect("/requeststore")
            }
            
            
        }
       
    },[status])
    if(isLoading) return<Suspense fallback={<Loading/>}/>
    return <><Suspense fallback={<Loading/>}>
    <AdminToolBar/>
    <div className="grid basis-full mobile:my-[90px] my-[65px] grid-cols-1 mobile:grid-cols-[208px,auto] fixed w-full">
    <Navbar/>
    {children}
    </div>
    </Suspense>
    </>
}

export default Layout