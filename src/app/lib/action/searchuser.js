"use server";

const { API_URL } = require("../utils/utils");

export default async function searchUser({searchValue,accessToken}){
  const response = await  fetch(API_URL(`search/users/${searchValue}`),{
        method:'GET',
        cache:'no-cache',
        headers:{
            'Authorization':`Bearer ${accessToken}`
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