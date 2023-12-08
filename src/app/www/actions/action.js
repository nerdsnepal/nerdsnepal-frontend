"use server"
import { API_URL,SICHU_API_KEY } from "@/app/lib/utils/utils"

export const fetchSichu  = async({accessToken='',endPoint='',revalidate=60})=>{
    const result =await fetch(API_URL(endPoint),{
        method:"GET",
        
        next:{
            revalidate:revalidate
        },
        headers:{
            'authorization':`Bearer ${accessToken}`,
            ...SICHU_API_KEY
           
        }
    })
    if(!result.ok){
        throw new Error("Something went wrong")
    }
  
return (await result).json()
}
export const postRequestSichu  = async({accessToken='',body,endPoint='',method="POST"})=>{
    const result =await fetch(API_URL(endPoint),{
        method:method,
       body:JSON.stringify(body),
       cache:"no-store",
        headers:{
            'authorization':`Bearer ${accessToken}`,
            ...SICHU_API_KEY,
            'Content-Type':'application/json'
        }
    }) 
return (await result).json()
}