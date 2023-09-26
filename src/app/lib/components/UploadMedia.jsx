'use client'
import { useEffect, useState } from "react";
import { uploadMedia } from "../action/mediaUpload";
import { useSelector } from "react-redux";
import UploadedImage from "@/app/admin/(dashboard)/(products)/category/components/uploadedImage";
import { Alert, Snackbar } from "@mui/material";


/*
storedId is used as a parementer 
and the onUploadedMediadUrl,number_of_files and state is the callback function 

state = idel | unselected | uploading | success |failed


*/
const UploadMedia = ({clearState=false,btnName,onUploadedMedialUrl,number_of_files,state,onDownloadProgress,hideUploadedImageView=true}) => {
    const accessToken = useSelector((state)=>state.auth.accessToken)
    const storeId = useSelector((state)=>state.auth.storeId)
    const [response,setResponse] = useState({
        servity:"success",
        message:"",
        hasResponse:false
    })
    const [currentUrls,setUrls]= useState([])
    useEffect(()=>{
       if(clearState){
        setResponse({servity:"info",message:"",hasResponse:false})
        setUrls([])
       }
    },[clearState])
    useEffect(()=>{
        setResponse({servity:"info",message:"",hasResponse:false})
        setUrls([])
    },[storeId])

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
            if(number_of_files)
            number_of_files(0)
        }
    }

    const upload = (files)=>{
         //add the file into the form
         if(files && files.length>7){
            setAndResetResponse({servity:"info",message:"More than 7 files cann't be uploaded at a time"})
            return
         }
         let formData = new FormData()
         for(let file of files){
             formData.append("media",file)
         }
         //append the storeId 
         formData.append("storeId",storeId)
         if(number_of_files)
         number_of_files(files.length)
         state("uploading")
         setAndResetResponse({message:"Uploading...",servity:"info"})
         //Upload the media 
        uploadMedia({formData,accessToken},callback).then((res)=>{
             const {urls} = res 
             if(onUploadedMedialUrl!==undefined)
             onUploadedMedialUrl({urls})
            setUrls((state)=>state.concat(urls))
             state("success")
             setAndResetResponse({message:"Uploaded",servity:"success"})
        }).catch((err)=>{
             state("failed")
             setAndResetResponse({message:"Failed",servity:"error"})
        })
    }

    // remove the image_url 
    const onRemoveImageUrl = (url)=>{
        const imageUrls=  currentUrls.filter((currentUrl)=>currentUrl!=url)
        setUrls(imageUrls)
     }

     const setAndResetResponse = ({servity,message})=>{
        setResponse({servity:servity,message:message,hasResponse:true})
        setTimeout(()=>{
            setResponse({servity:"success",message:"",hasResponse:false})
        },3500)
       }

    return (
        <div className="space-y-8 h-fit relative w-full">
            <form className="flex justify-center items-center">
                <label className="px-6 py-3 cursor-pointer drop-shadow-md border-2 border-dashed  rounded-md text-black" htmlFor="media">{btnName!==undefined?btnName:'Browse'}</label>
                <input type="file"  onChange={onChangeHandle} multiple={true} hidden accept="image/*" id="media" name="media" />
            </form>
            {
                !hideUploadedImageView? <div className="flex flex-wrap mt-5 gap-2">
                {
                currentUrls?.map((url)=>{
                    return <UploadedImage key={url} url={url} onRemoved={onRemoveImageUrl}/>
                })
               }
             </div>:<></>
             
            }
            {
                currentUrls?.length===0?<h2 className="text-center text-clip font-semibold">Please select and upload media</h2>:<></>
             }
           
           <Snackbar open={response.hasResponse} anchorOrigin={{ vertical:"bottom", horizontal:"right" }}  autoHideDuration={3000}>
            <Alert severity={response.servity}>{response.message}</Alert>
        </Snackbar>
        </div>

    );
}
 
export default UploadMedia;