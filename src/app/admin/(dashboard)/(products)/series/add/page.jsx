'use client'
import { Alert, Button, Card, FormControl, MenuItem, Select, Snackbar, Stack, TextField, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import AddSeriesToolbar  from "../components/add-series-toolbar";
import { Image, Try } from "@mui/icons-material";
import React,{  useEffect, useState } from "react";
import UploadMedia from "@/app/lib/components/UploadMedia";
import { useSelector } from "react-redux";
import Status from "@/app/admin/components/status";
import { postRequestSichu } from "@/app/www/actions/action";

const SeriesAddPage = () => {
    const [series,setSeries]= useState({
        name:"",
        hasDuplicate:false,
        status:true,
        urls:[]
    })
    const accessToken = useSelector((state)=>state.auth.accessToken)
    const storeId = useSelector((state)=>state.auth.storeId)
    const [btnStatus,setBtnStatus] = useState(false)
    const [response,setResponse] = useState({
        servity:"success",
        message:"",
        hasResponse:false
    })
    const [uploadStateClear,setUploadState] = useState(false)
    const elevation = 1
    /**Handle the changes in the input if
     * type ===1 then this is for status 
     * type === 0 means for category name 
     * type ===2 means for image 
      */
    const handleChange = (e,type)=>{
        if(type===0)
        setSeries({...series,name:e.target.value})
        if(type===1)
        setSeries({...series,status:e.target.value})
        if(type===2){
            const {files} = e.target
            if(files && files[0]){
               setFiles(files)
            }
        }
    }
    const onUploadSuccessfully = ({urls})=>{
        if(urls===undefined)return
        let updatedUrls = Array.from(urls)
        setSeries({...series,urls:series.urls.concat(updatedUrls)})
    }
    const validator=()=>{
        if(series.name.trim()!=='' && series.urls.length>0){
            setBtnStatus(true)
        }else{
            setBtnStatus(false)
        }
    }
   useEffect(()=>{
    validator()
   },[series])

   //to clear the form 
   const clearForm=()=>{
        setSeries({name:"",status:true,urls:[],hasDuplicate:false})
        setUploadState(true)
        setBtnStatus(false)
   }
   const resetResponse = ()=>{
    validator()//calling for recheck the state of the button 
    setTimeout(()=>{
        setResponse({servity:"success",message:"",hasResponse:false})
        setUploadState(true)
    },3500)
   }
   // save the category
   const saveSeries= async()=>{
       try{
       let res= await postRequestSichu({accessToken,endPoint:"admin/series",method:"POST",body:{...series,storeId}})
       const {success} = res 
       const {message} = res 
       if(success){
        setResponse({servity:"success",message,hasResponse:true})
        clearForm()
       }else{
        setResponse({servity:"error",message,hasResponse:true})
       }
       }catch(error){
        
        setResponse({servity:"error",message:"Something went wrong",hasResponse:true})
       }finally{
            resetResponse()
       }
   }
// uploading state handle 
   const stateOfUploading = (state)=>{
    setUploadState(false)
    return
   }

    return (<div className="overflow-auto h-[90%]">
        <AddSeriesToolbar/>
        <Snackbar open={response.hasResponse} anchorOrigin={{ vertical:"bottom", horizontal:"right" }}  autoHideDuration={3000}>
            <Alert severity={response.servity}>{response.message}</Alert>
        </Snackbar>
       <div className="mobile:grid grid-row-2  relative justify-center my-8 mobile:grid-cols-[60%,30%] mobile:gap-1 scroll-auto">
            <section className="order-2 mobile:w-[75%] justify-self-center">
            <Card sx={{minHeight:"150px"}} className="p-5 dark:bg-white dark:text-black" elevation={elevation}>
                <h1 className="p-2 font-bold">Series</h1>
               <FormControl className="w-[80%]">
               <TextField value={series.name} required className=" mx-2 my-2" 
            //   sx={{
            //        input:{
            //        color:prefersMode?'white':'black',
            //        }}} 
                onChange={(e)=>handleChange(e,0)} focused type="text" variant="outlined" label="Series name"
                 about="Series Name" color="primary"  aria-label="Series name"
                 />
            
               </FormControl>
              
            </Card>
            <Card sx={{minHeight:"200px"}} className="p-5 dark:bg-white  my-8" elevation={elevation}>
                <h1 className="p-2 font-bold">Media</h1>
               <div className="flex justify-center items-center">
                <UploadMedia number_of_files={(len)=>{}}
                clearState={uploadStateClear}
                onUploadedMedialUrl={onUploadSuccessfully}
                state={stateOfUploading}
                hideUploadedImageView={false}
                     btnName={"Add media"}/>
               </div> 
    
            </Card>
            </section>
            <section className="order-1 mobile:order-2">
            <Card className="p-5 h-[120px] flex justify-start items-center gap-4 dark:white" elevation={elevation}>
                <div>
                <h1 className="p-2 font-bold">Status</h1>
              <Status 
               value={series.status}
               onChange={(value)=>{
                setSeries({...series,status:value})}}
              />
                </div>
            </Card>
            </section>
        </div>
       <div className="flex justify-center"><Button variant="outlined" onClick={saveSeries} disabled={!btnStatus} className={`dark:text-white  ${!btnStatus?'text-gray-800':'text-black font-semibold'}  capitalize`} size="large">Save</Button></div>
            <div className="h-[20%]"></div>
    </div>);
}
 
export default SeriesAddPage;