'use client'
import { useEffect, useState } from "react";
import { uploadMedia } from "../action/mediaUpload";
import { useSelector } from "react-redux";
import { Cropper } from "react-cropper";


/*
storedId is used as a parementer 
and the onUploadedMediadUrl,number_of_files and state is the callback function 
*/
const UploadMedia = ({btnName,onUploadedMedialUrl,number_of_files,state,onDownloadProgress}) => {
    const accessToken = useSelector((state)=>state.auth.accessToken)
    const storeId = useSelector((state)=>state.auth.selectedStore)
    useEffect(()=>{
        state("idel")
    },[])
    const callback = (percentage)=>{
        if(onDownloadProgress!==undefined)
        onDownloadProgress(percentage);
    }
    const onChangeHandle = (e)=>{
        e.preventDefault()
        const {files} = e.target 
        if(files && files.length>0){
            // Upload the file
            upload(files)
        }else{
            state("unselected")
            number_of_files(0)
        }
    }

    const upload = (files)=>{
         //add the file into the form
         let formData = new FormData()
         for(let file of files){
             formData.append("media",file)
         }
         //append the storeId 
         formData.append("storeId",storeId)
         number_of_files(files.length)
         state("uploading")
         //Upload the media 
        uploadMedia({formData,accessToken},callback).then((res)=>{
             const {urls} = res 
             if(onUploadedMedialUrl!==undefined)
             onUploadedMedialUrl({urls})
             state("success")
        }).catch((err)=>{
             //console.log(err);
             state("failed")
        })
    }

    return (
        <div>
            <form>
                <label className="px-6 py-3 cursor-pointer drop-shadow-lg bg-gray-500 rounded-md text-white" htmlFor="media">{btnName!==undefined?btnName:'Browse'}</label>
                <input type="file"  onChange={onChangeHandle} multiple={true} hidden accept="image/*" id="media" name="media" />
            </form>
           
        </div>

    );
}
 
export default UploadMedia;