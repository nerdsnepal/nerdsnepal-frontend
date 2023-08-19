"use server"

const { API_URL } = require("../lib/utils/utils")

export const fetchUserInfoById = async({userId,accessToken})=>{
    const res = await  fetch(API_URL(`search/user/?userIds=${userId}`),{
        method:"GET",
        cache:"no-cache",
        //next:{
        //    revalidate:30
        //},
        headers:{
            'authorization':`berear ${accessToken}`
        }
    })
    return await res.json()
}


