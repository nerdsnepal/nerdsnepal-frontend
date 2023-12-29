"use client"

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {  fetchStoreById, storeAPI } from "../../action/actions";
import { Alert, Avatar, Box, Button, Card, Skeleton, Stack, TextField } from "@mui/material";
import { API_URL, isEmpty, skeletonSX } from "@/app/lib/utils/utils";
import {  LocalMallRounded } from "@mui/icons-material";
import Status from "@/app/admin/components/status";
import { uploadMedia } from "@/app/lib/action/mediaUpload";
import StockLocation from "../../components/stock_location";
import StoreEmail from "../../components/store-email";
import UpdateAboutStore from "../../components/update-about-store";


const StoreName = ({store,accessToken})=>{
    const [isEditMode,setEditMode] = useState(false)
    const [name,setName] = useState(store.name) 
    const [error,setError] = useState({
        message:"",
        hasError:false 
    })
    const [onNameChanged,setOnChnaged] = useState(false)

    const handleDone = async()=>{
        if(name.length<=3){
            setError({message:"Store name length must be greater than 3",hasError:true})
            setName(store.name)
            return
        }
        if(name===store.name){
            setEditMode(false)
            return 
        }
        try{
            const body = {storeId:store._id,name}
            const result = await storeAPI({body,accessToken,api:'name'})
            if(result.success){
                setOnChnaged(true)
            }
        }catch(error){
            setName(store.name)
            setError({hasError:true,message:"Something went wrong"})
        }finally{

            setTimeout(()=>{
                setEditMode(false)
                setOnChnaged(false)
                setError({hasError:false,message:""})
            },3000)
          
        }
    }
    const handleOnChange= (e)=>{
        setName(e.target.value)
        if(isEmpty(e.target.value)){
            setError({message:"Store name can't be empty",hasError:true})
        }else{
            setError({message:"",hasError:false})
        }
    }
    return <Box  className="h-fit border p-4 space-y-2 w-full ">
        <Stack direction={"row"} gap={2}>
        <b>Store Name: {!isEditMode?name:null} </b> 
        {!isEditMode?<i onClick={()=>setEditMode(true)}>Edit</i>:null}
        {
            isEditMode? <Stack direction={"column"} gap={2}>
                <TextField value={name} onChange={handleOnChange} size="small" />  
                <Button onClick={handleDone} variant="outlined" color="primary">Done</Button>
              </Stack>:null
        }

        </Stack>
        {
            onNameChanged?<Alert severity="success">Name Changed</Alert>:null
        }
        {
            isEditMode?<Alert severity="info">
                Store name must be unique 
            </Alert>:null   
        }
        {
            error.hasError?<Alert severity={`error`}>
                {error.message}
            </Alert>:null 
        }
    </Box>
}
const StoreLogo = ({store,accessToken})=>{
    const [logo,setLogo] = useState(store.logo) 
    const handleChange = async(e)=>{
        const {files} = e.target
        if(files.length===0)return 
        let formData = new FormData()
        formData.append("logo",files[0])
        formData.append("storeId",store._id)
        try {
            const result = await uploadMedia({formData:formData, accessToken:accessToken,api:'upload/logo'},(progress)=>{
                //console.log(progress);
            })
            if(result.success){
                
                setLogo(result.logoUrl)
            }
        } catch (error) {
           // console.log(error);
        }
    }
    return <Box className="space-y-4 p-3 border">
    <h2><b>Logo </b></h2>
        <label className="cursor-pointer" htmlFor="logo">
            {logo===null?<LocalMallRounded  fontSize="large" />:null}
            {logo!==null?<Avatar className="w-[75px] h-[75px]" src={API_URL(logo)} alt={store.name} />:null}
        </label>
        <input multiple={false} onChange={handleChange} accept="image/*" type="file" name="logo" id="logo" hidden />
    <Alert severity="info">Click logo to change it</Alert>
    </Box>

}

const StoreInformationEditPage = ({storeId}) => {
    const accessToken = useSelector((state)=>state.auth.accessToken)
    const [isLoading,setLoading] = useState(true)
    const [response,setResponse] = useState({
        hasError:false,
        isLoading:true,
        error:"",
        data:null
    })
    useEffect(()=>{
        (async()=>{
           try{
            const result= await fetchStoreById({_id:storeId,accessToken})
            if(result.success){
                setResponse({...response,data:result.store,isLoading:false,hasError:false})
            }
           }catch(error){
            setResponse({...response,isLoading:false,hasError:true,error:error})
           }finally{
            setLoading(false)
           }
        })()
    },[accessToken,storeId])

    const handleOnChangeStaus = async(status)=>{
            try {
                const body = {storeId:storeId,status}
                const result = await  storeAPI({body,accessToken,api:'status'})
            } catch (error) {
                //handle error
            }
    }
    return ( <Box  className="m-4 overflow-auto h-[100vh] w-[100%]">
        <Stack direction={{ xs: 'column', md: 'row' }} gap={3}  >
       <Stack direction={"column"} overflow={"auto"} gap={3} className="w-full mobile:w-[50%]">
       {isLoading?<Skeleton variant="rounded" sx={skeletonSX} height={80} className={'p-0'}  />:<StoreName store={response.data} accessToken={accessToken}/>}
       {isLoading?<Skeleton variant="rounded" sx={skeletonSX} height={125} className={'p-0'}  />:<StoreLogo store={response.data} accessToken={accessToken}/>}
   
        {isLoading?<Skeleton variant="rounded" sx={skeletonSX} height={125} className={'p-0'}  />: <Box className="border">
       <div className="m-4 space-y-3">
        <h1 className="font-bold">Store Status</h1>
        <Status value={response.data.status	} onChange={handleOnChangeStaus} />
        <Alert severity="info">It indicate whether your store is live or not</Alert>
        </div>
        </Box>
        } 
        {isLoading?<Skeleton variant="rounded" sx={skeletonSX} height={200} className={'p-0'}  />:<UpdateAboutStore accessToken={accessToken} store={response.data} />}     
      </Stack>
       <Stack direction={'column'} className="w-full mobile:w-[50%]" gap={3}>
       {isLoading?<Skeleton variant="rounded" sx={skeletonSX} height={200} className={'p-0'}  />:<StockLocation store={response.data} accessToken={accessToken} />}
       {isLoading?<Skeleton variant="rounded" sx={skeletonSX} height={200} className={'p-0'}  />:<StoreEmail accessToken={accessToken} store={response.data} />}
       </Stack>
       </Stack>
       <Box height={120}></Box>
       </Box>
    );
}

export default StoreInformationEditPage;