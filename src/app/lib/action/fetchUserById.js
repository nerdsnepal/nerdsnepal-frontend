"use server";

const { API_URL, SICHU_API_KEY } = require("../utils/utils");

export default async function fetchUserById({_id}){
  const response = await  fetch(API_URL(`search/user?userIds=${_id}`),{
        method:'GET',
        cache:'no-cache',
        headers:{
            ...SICHU_API_KEY
        },
        next:{
            tags:["users","searchUser"]
        }
    })
    console.log(response);
    if(!response.ok){
        throw new Error("Unable to fetch user")
    }
    return await response.json()

}