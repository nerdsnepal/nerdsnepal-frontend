//'use server'

import axios from "axios"
import { API_URL } from "../utils/utils"
//here cb is callback function which return uploadProgress
export async function uploadMedia({formData,accessToken},cb){
    const onProgress = (event)=>{
        const {progress}= event 
        cb(progress*100)
    }
    const headers = {
        'Content-Type':'multipart/form-data',
        'Authorization':`bearer ${accessToken}`,
        
    }
    const res = await axios.post(API_URL('upload'),formData,{headers:headers,onUploadProgress:onProgress})
    return res.data

}