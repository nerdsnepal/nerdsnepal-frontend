import { API_URL, SICHU_API_KEY } from "@/app/lib/utils/utils"
import axios from "axios"


export const addProduct =async({accessToken,product})=>{
    const result = await axios.post(API_URL('product'),product,{
        withCredentials:true,
        headers:{
            'authorization':`Bearer ${accessToken}`,
            'Content-Type':'application/x-www-form-urlencoded',
            ...SICHU_API_KEY
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
                ...SICHU_API_KEY
            }
        })
        if(!result.ok){
            throw new Error("Something went wrong")
        }
    return (await result).json()
}

export const getProductDetailsById = async ({accessToken,storeId,productId})=>{
    const result = await fetch(API_URL(`product/id?storeId=${storeId}&_id=${productId}`),{
        method:"GET",
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

export const deleteProductById = async ({accessToken,storeId,productId})=>{
  
    const result = await axios.delete(API_URL('product'),{
        data:{storeId,_id:productId},
        withCredentials:true,
        headers:{
            'authorization':`Bearer ${accessToken}`,
            'Content-Type':'application/x-www-form-urlencoded',
            ...SICHU_API_KEY
        }
    })
    return result
}


