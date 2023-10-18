"use server"
import { API_URL,SICHU_API_KEY } from "@/app/lib/utils/utils"

export const productAPI = async({body,accessToken,api,method="GET",cache="no-store"})=>{
    const result = await fetch(API_URL(`${api}`),{
        method:method,
        body:JSON.stringify(body),
        cache:cache,
        headers:{
            'authorization':`Bearer ${accessToken}`,
            'Content-type': 'application/json; charset=UTF-8',
            ...SICHU_API_KEY
        }
    })
    if(!result.ok){
        throw new Error("Something went wrong")
    }
    return (await result).json()
}

