//'use server'

import axios from "axios"
import { API_URL, SICHU_API_KEY } from "../utils/utils"
//here cb is callback function which return uploadProgress
export async function uploadMedia({formData,accessToken,api='upload'},cb){
    const onProgress = (event)=>{
        const {progress}= event 
        cb(progress*100)
    }
    const headers = {
        'Content-Type':'multipart/form-data',
        'Authorization':`bearer ${accessToken}`,
        ...SICHU_API_KEY
        
    }
    const res = await axios.post(API_URL(api),formData,{headers:headers,onUploadProgress:onProgress})
    return res.data

}