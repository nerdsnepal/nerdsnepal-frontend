"use server";

import { API_URL } from "@/app/lib/utils/utils";


export default async function fetchStores({accessToken}){
  const res = await fetch(API_URL("store"),{credentials:"include",
        headers:{
            'Authorization':`Bearer ${accessToken}`
        },
        next:{
            tags:['stores']
        }
    })
    if(!res.ok){
        
        throw new Error("Unable to fetch data")
    }
    return await res.json()
}

export  async function _createStore({merchantId,name,accessToken}){
    //const payload = {merchantId,name}
    try {
        const res = await fetch(API_URL("store/create"),{
            method:"POST",
            credentials:"include",
            cache:"no-cache",
            body:`merchantId=${merchantId}&name=${name}`,
            headers:{
                'authorization':`Bearer ${accessToken}`,
                'Content-Type':'application/x-www-form-urlencoded'
            }
        })
        console.log(res.status);
        return await res.json()
    } catch (error) {
        console.log(error);
        return error
    }

}

