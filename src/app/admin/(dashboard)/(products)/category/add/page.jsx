'use client'
import { Alert, Button, Card, FormControl, MenuItem, Select, Snackbar, Stack, TextField, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import AddCategoryToolbar from "../components/add-category-toolbar";
import { Image, Try } from "@mui/icons-material";
import React,{  useEffect, useState } from "react";
import UploadMedia from "@/app/lib/components/UploadMedia";
import UploadedImage from "../components/uploadedImage";
import { save_category } from "../actions/action";
import { useSelector } from "react-redux";
import Status from "@/app/admin/components/status";
import SubCategory from "@/app/admin/components/subcategory";

const CategoryAddPage = () => {
    const [category,setCategory]= useState({
        name:"",
        subCategory:[''],
        hasDuplicate:false,
        status:true,
        imageUrl:[]
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
        setCategory({...category,name:e.target.value})
        if(type===1)
        setCategory({...category,status:e.target.value})
        if(type===2){
            const {files} = e.target
            if(files && files[0]){
               setFiles(files)
            }
        }
    }
    
    const prefersMode = useMediaQuery('(prefers-color-scheme: dark)');
    const onUploadSuccessfully = ({urls})=>{
        if(urls===undefined)return
        let updatedUrls = Array.from(urls)
        setCategory({...category,imageUrl:category.imageUrl.concat(updatedUrls)})
    }
    const validator=()=>{
        if(category.name.trim()!=='' && category.imageUrl.length>0){
            setBtnStatus(true)
        }else{
            setBtnStatus(false)
        }
    }
   useEffect(()=>{
    validator()
   },[category])

   //to clear the form 
   const clearForm=()=>{
        setCategory({name:"",status:true,imageUrl:[],hasDuplicate:false,subCategory:['']})
        setUploadState(true)
   }
   const resetResponse = ()=>{
    validator()//calling for recheck the state of the button 
    setTimeout(()=>{
        setResponse({servity:"success",message:"",hasResponse:false})
        setUploadState(true)
    },3500)
   }
   // save the category
   const saveCategory= async()=>{
       try{
        if(category.hasDuplicate){
            setResponse({servity:"error",message:"Sub category can't be duplicate",hasResponse:true})
            return
        }
       let res= await save_category({...category,accessToken,storeId})
       const {success} = res 
       if(success){
        const {message} = res 
        setResponse({servity:"success",message,hasResponse:true})
        clearForm()
       }else{
        const {error} = res 
        setResponse({servity:"error",message:error,hasResponse:true})
       }
       }catch(error){
        setResponse({servity:"error",message:error,hasResponse:true})
       }finally{
            resetResponse()
       }
   }
// uploading state handle 
   const stateOfUploading = (state)=>{
    setUploadState(false)
    return
   }

   //handle onChange sub category 
   const handleOnChageSubCategory = (_category,error)=>{
        setCategory({...category,subCategory:_category.subcategory,hasDuplicate:error.hasError})
   }

    return (<div className="overflow-auto h-[90%]">
        <AddCategoryToolbar/>
        <Snackbar open={response.hasResponse} anchorOrigin={{ vertical:"bottom", horizontal:"right" }}  autoHideDuration={3000}>
            <Alert severity={response.servity}>{response.message}</Alert>
        </Snackbar>
       <div className="mobile:grid grid-row-2  relative justify-center my-8 mobile:grid-cols-[60%,30%] mobile:gap-1 scroll-auto">
            <section className="order-2 mobile:w-[75%] justify-self-center">
            <Card sx={{minHeight:"150px"}} className="p-5 dark:bg-white dark:text-black" elevation={elevation}>
                <h1 className="p-2 font-bold">Category</h1>
               <FormControl className="w-[80%]">
               <TextField value={category.name} required className=" mx-2 my-2" 
            //   sx={{
            //        input:{
            //        color:prefersMode?'white':'black',
            //        }}} 
                onChange={(e)=>handleChange(e,0)} focused type="text" variant="outlined" label="Category name"
                 about="Category Name" color="primary"  aria-label="Category name"
                 />
                <SubCategory subCategory={category.subCategory} onSaved={category.subCategory.length===1} parent={category.name} onChangeSubCategory={handleOnChageSubCategory} />
            
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
               value={category.status}
               onChange={(value)=>{
                setCategory({...category,status:value})}}
              />
                </div>
            </Card>
            </section>
        </div>
       <div className="flex justify-center"><Button variant="outlined" onClick={saveCategory} disabled={!btnStatus} className={`dark:text-white  ${!btnStatus?'text-gray-800':'text-black font-semibold'}  capitalize`} size="large">Save</Button></div>
            <div className="h-[20%]"></div>
    </div>);
}
 
export default CategoryAddPage;