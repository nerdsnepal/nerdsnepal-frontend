'use client'

import { FormControl, MenuItem, Select, Stack } from "@mui/material";
import { useEffect, useState } from "react";
const Status = ({onChange,value}) => {
    const statusOptions = [
        {value:true,text:"Active"},
        {value:false,text:"Draft"}
    ] 
    const [selectedOption,setOption] = useState(true)
    useEffect(()=>{
        if(value)
        setOption(value)
    },[value])

    return (<Stack direction="row" gap={1}>
        <FormControl size="small" sx={{minWidth:"150px"}}>
    <Select
     value={selectedOption}
     color="primary"
     className=" outline-white"
     fullWidth
     onChange={(e)=>{
        if(onChange) 
        onChange(e.target.value)
        setOption(e.target.value)
     }}
     autoWidth>
     {
         statusOptions.map(({value,text})=>{
             const status = value ===selectedOption
             if(status){
                return <MenuItem  key={text} value={value} selected>{text}</MenuItem>
             }
            return <MenuItem key={text} value={value}>{text}</MenuItem>
         })
       }
       
    </Select>
         </FormControl>
       {
        value!==undefined?<div className={`h-4 w-4 mt-1 mx-3 ${selectedOption?'bg-green-600':'bg-red-600'} rounded-full`}></div>:<></>
       }
    </Stack>
 );
}
 
export default Status;