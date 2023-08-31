"use server"

const { API_URL, SICHU_API_KEY } = require("../lib/utils/utils")

export const fetchUserInfoById = async({userId,accessToken})=>{
    const res = await  fetch(API_URL(`search/user/?userIds=${userId}`),{
        method:"GET",
        cache:"no-cache",
        //next:{
        //    revalidate:30
        //},
        headers:{
            'authorization':`berear ${accessToken}`,
            ...SICHU_API_KEY
        }
    })
    return await res.json()
}


