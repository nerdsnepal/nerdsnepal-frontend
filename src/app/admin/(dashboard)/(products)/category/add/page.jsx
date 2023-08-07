'use client'
import { Button, Card, FormControl, MenuItem, Select, TextField, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import AddCategoryToolbar from "../components/add-category-toolbar";
import { Image, Try } from "@mui/icons-material";
import React,{  useEffect, useState } from "react";
import UploadMedia from "@/app/lib/components/UploadMedia";
import UploadedImage from "../components/uploadedImage";
import { save_category } from "../action/saveCategory";
import { useSelector } from "react-redux";

const CategoryAddPage = () => {
    const [category,setCategory]= useState({
        name:"",
        status:false,
        imageUrl:[]
    })
    const accessToken = useSelector((state)=>state.auth.accessToken)
    const [btnStatus,setBtnStatus] = useState(false)
    const [isSaved,setStatus] = useState(false)
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
    
    const statusOptions = [
        {value:true,text:"Active"},
        {value:false,text:"Draft"}
    ] 
    const prefersMode = useMediaQuery('(prefers-color-scheme: dark)');
    const onUploadSuccessfully = ({urls})=>{
        if(urls===undefined)return
        let updatedUrls = Array.from(urls)
        setCategory({...category,imageUrl:category.imageUrl.concat(updatedUrls)})
    }

    // remove the image_url 
    const onRemoveImageUrl = (url)=>{
       const imageUrls=  category.imageUrl.filter((currentUrl)=>currentUrl!=url)
       setCategory({...category,imageUrl:imageUrls})
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

   const saveCategory= async()=>{
       try{
       let res= await save_category({...category,accessToken})
       console.log(res);
       setStatus(true)
       }catch(error){
          console.log(error);
       }finally{
        setTimeout(()=>{
            setStatus(false)
        },3000)
       }
   }



    return (<div>
        <AddCategoryToolbar/>
       <div className="mobile:grid grid-row-2  relative justify-center my-8 mobile:grid-cols-[60%,30%] mobile:gap-1 scroll-auto">
            <section className="order-2 mobile:w-[75%] justify-self-center">
            <Card sx={{minHeight:"150px"}} className="p-5 dark:bg-gray-900 dark:text-white" elevation={elevation}>
                <h1 className="p-2 font-bold">Category</h1>
               <FormControl className="dark:text-white w-[80%]">
               <TextField className=" mx-2 my-2" sx={{
                input:{
                color:prefersMode?'white':'black',
                borderColor:'white'
               }}} 
                onChange={(e)=>handleChange(e,0)} focused type="text" variant="outlined" label="Category name"
                 about="Category Name" color="primary"  aria-label="Category name"
                 />
               </FormControl>
              
            </Card>
            <Card sx={{minHeight:"200px"}} className="p-5 dark:bg-gray-900 dark:text-white my-8" elevation={elevation}>
                <h1 className="p-2 font-bold">Media</h1>
               <div className="flex justify-center items-center">
                <UploadMedia number_of_files={(len)=>console.log(len)}
                onUploadedMedialUrl={onUploadSuccessfully}
                state={(state)=>console.log(state)}
                 btnName={"Add media"}/>
               </div> 
             <div className="flex flex-wrap mt-5 gap-2">
             {
                category.imageUrl.map((url)=>{
                    return <UploadedImage key={url} url={url} onRemoved={onRemoveImageUrl}/>
                })
               }
             </div>

            </Card>
            </section>
            <section className="order-1 mobile:order-2">
            <Card className="p-5 h-[120px] flex justify-start items-center gap-4 dark:text-white dark:bg-gray-900" elevation={elevation}>
                <div>
                <h1 className="p-2 font-bold">Status</h1>
               <FormControl size="small" sx={{minWidth:"150px"}}>
               <Select
                value={category.status}
                color="primary"
                className="dark:text-white outline-white"
                fullWidth
                onChange={(e)=>handleChange(e,1)}
                autoWidth>
                {
                    statusOptions.map(({value,text})=>{
                        const status = category.status === value
                        if(status){
                            return   <MenuItem key={text} value={value} selected>{text}</MenuItem>
                        }
                       return   <MenuItem key={text} value={value}>{text}</MenuItem>
                    })
                  }
                  
                </Select>
               </FormControl>
                
                </div>
                <div className={`h-4 w-4 mt-5 mx-3 ${category.status?'bg-green-600':'bg-red-600'} rounded-full`}></div>
            </Card>
            </section>
          
        </div>
       <div className="flex justify-center"><Button variant="outlined" onClick={saveCategory} disabled={!btnStatus} className="dark:text-white font-semibold text-black capitalize" size="large">Save</Button></div>

    </div>);
}
 
export default CategoryAddPage;