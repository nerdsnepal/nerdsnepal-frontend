'use client'
import { TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";


const ProductSearchEngineListing = ({onChangeTitle,onChangeDescription,value}) => {
    const titleRef = useRef()
    const descriptonRef = useRef() 
    const [isEditMode,setEdit] = useState(false)


    const toEditMode = ()=>{
        setEdit(true)
    }
    return (<>
        <div className="inline-block space-x-2">
            <strong>Search Engine Listing</strong>
           {!isEditMode? <span onClick={toEditMode} className="select-none text-blue-500 cursor-pointer">edit</span>:<></>}
        </div>
        {
            isEditMode?<div className="block p-2 space-y-2">
                <h2>Add title and description for the search engine listing</h2>
                <TextField value={value?.title} ref={titleRef}
                onChange={(e)=>{
                    if(onChangeTitle)
                    onChangeTitle(e.target.value)
                }}
                
                 title="Page title" label="Page title" fullWidth={true} />
                <h3>It is best to keep page titles between 50 and 60 characters long</h3>
                <TextField value={value?.description} title="Description"
                ref={descriptonRef}
                onChange={(e)=>{
                    if(onChangeDescription)
                    onChangeDescription(e.target.value)
                }}
                 label="Meta description"
                 multiline 
                 fullWidth={true}aria-rowspan={2}
                  rows={2} />
                <h3>The recommended length for a meta description is between 150 and 160 characters.</h3>
            </div>:<></>
        }
    
    </>);
}
 
export default ProductSearchEngineListing;