'use server'

const { API_URL } = require("@/app/lib/utils/utils")
const { default: axios } = require("axios")

export const removeImage = async({storeId,accessToken,path})=>{
    const headers = {
        'authorization':`bearer ${accessToken}`
    }
    const res = await axios.delete(API_URL('upload'),{storeId,path},{headers:headers})
    console.log(res);
    return res.data
}
