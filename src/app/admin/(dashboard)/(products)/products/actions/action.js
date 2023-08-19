import { API_URL } from "@/app/lib/utils/utils"
import axios from "axios"


export const addProduct =async({accessToken,product})=>{
    const result = await axios.post(API_URL('product'),product,{
        withCredentials:true,
        headers:{
            'authorization':`Bearer ${accessToken}`,
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
  
    return result.data
}

export const getAllStoreRelatedProduct = async ({accessToken,storeId,selectedView='all'})=>{
    if(!accessToken||storeId===null) throw new Error("Something went wrong")
        const result =await fetch(API_URL(`product?storeId=${storeId}&selected=${selectedView}`),{
            method:"GET",
            headers:{
                'authorization':`Bearer ${accessToken}`,
            }
        })
        if(!result.ok){
            throw new Error("Something went wrong")
        }
    return (await result).json()
}



