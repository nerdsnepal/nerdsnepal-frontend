'use client';

import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setAccessToken, setInit, setRole, setUser } from "../state/reducer/authSlice";
import { isExpired } from "../lib/utils/utils";
import { useEffect, useState } from "react";
import { usePathname,useRouter } from "next/navigation";
import Loading from "../loading";


const SessionProvider = (params) => {
    const router = useRouter()
    const pathname = usePathname()
    const {status,data} = useSession()
    const [isLoading,setLoading] = useState(true)
    const dispatch = useDispatch()
    
    useEffect(()=>{
       if(status!=='loading'){
        setLoading(false)
       }
        if(status === "unauthenticated"){
            dispatch(setInit())
        }
        if(status==="authenticated"){
           if(isExpired({expires:data.expires})){
            console.log("Expired");
           }else{
            if(pathname==='/login'||pathname==='/register'||pathname==='/reset'){
                router.replace('/')
            }
           }
            const {role,isVerified,accessToken,email,fullname,username,profile} = data.user
            dispatch(setRole(role))
            dispatch(setUser({isVerified,email,fullname,username,profile}))
            dispatch(setAccessToken(accessToken)) 
        }
       
    },[status])
    if(isLoading)return <Loading/>
    return null;
}
 
export default SessionProvider;