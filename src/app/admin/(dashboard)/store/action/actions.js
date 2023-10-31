"use server";

import { API_URL, SICHU_API_KEY } from "@/app/lib/utils/utils";
import { revalidatePath, revalidateTag } from "next/cache";
export default async function fetchStores({accessToken}){
 
     const res = await fetch(API_URL("store"),{credentials:"include",
           cache:"no-store",
           headers:{
               'Authorization':`Bearer ${accessToken}`,
               ...SICHU_API_KEY
           },
           next:{
               tags:['stores']
           }
       })
       if(!res.ok){
        //   throw new Error("Unable to fetch data")
        return null
       }
       return await res.json()
 
}

export  async function _createStore({merchantId,name,accessToken}){
    //const payload = {merchantId,name}
    try {
        const res = await fetch(API_URL("store/create"),{
            method:"POST",
            credentials:"include",
            cache:"no-store",
            body:`merchantId=${merchantId}&name=${name}`,
            headers:{
                'authorization':`Bearer ${accessToken}`,
                'Content-Type':'application/x-www-form-urlencoded',
                ...SICHU_API_KEY
            }
        })
        if(res.status===200){
            revalidatePath("/page.js")
        }
        return await res.json()
    } catch (error) {
        //console.log(error);
        return error
    }

}

export  async function fetchStoreById({_id,accessToken}){
    const res = await fetch(API_URL(`store/storeId?storeId=${_id}`),{credentials:"include",
    cache:"no-store",
    headers:{
        'Authorization':`Bearer ${accessToken}`,
        ...SICHU_API_KEY
    },
    next:{
        tags:['stores']
    }
    })
   // console.log(res);
if(!res.ok){
    throw new Error("Unable to fetch data")
}
return await res.json()
}
/*
    This API is use to update the store information 



*/
export async function storeAPI({body,accessToken,api}){
    const result = await fetch(API_URL(`store/${api}`),{credentials:"include",
    method:"PATCH",
    cache:"no-store",
    body:JSON.stringify(body),
    headers:{
        'Authorization':`Bearer ${accessToken}`,
        'Content-type': 'application/json; charset=UTF-8',
        ...SICHU_API_KEY
        },
    })
    if(!result.ok){
        throw new Error("Something went wrong")
    }
    return await result.json()
}
