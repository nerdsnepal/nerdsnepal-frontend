'use client'
import { isEmpty } from '@/app/lib/utils/utils';
import { Delete, DeleteOutline, ErrorOutline, PlayArrowSharp } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Alert, Button, Chip, FormControl, MenuItem, Select, Stack, TextField } from '@mui/material';
import {  useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const AddProductOptionEditor = ({selected="Size",onSubmit,index,name,values, options })=>{
    const [variants,setVariants] = useState(["Size","Color","Material","Style"])
    const [hasErrorInSelected,setHasError] = useState(false)
    const [selectedOption,setOption] = useState(selected)
    const [optionsValue,setOptionsValue]  = useState([''])
    const [placeholder,setPlaceHolder] = useState("Medium")

    useEffect(()=>{
        if(index>0){
            setOption('')
        }
        if(name && !isEmpty(name))
            setOption(name)
        if(values && values?.length>0)
            setOptionsValue(values)
    },[])

    const [error,setError] = useState({
        hasError:false,
        message:""
    })
    const handleOnChange = (e,index)=>{
       let newInputValue = [...optionsValue]
       newInputValue[index] = e.target.value 
       if(optionsValue.length===index+1){
            newInputValue.push('')
       }
       setOptionsValue(newInputValue)
        if(new Set(newInputValue).size!=newInputValue.length){
            setError({
                hasError:true,
                message:"Duplicate value found"
            })
        }else{
            setError({hasError:false,message:""})
        }
       
    }
    //delete options 
    const handleDelete = (value)=>{ 
        const newOptions = optionsValue.filter((currentValue)=>currentValue!==value)
        setOptionsValue(newOptions)
    }
    const duplicateSelected = (value)=>{
        let hasDuplicate = false;
            options.map(({name})=>{
                if(value===name){
                    hasDuplicate=true
                }
            })
            return hasDuplicate
    }
    //handle On select Option
    const handleOnSelect = (e)=>{
        setOption(e.target.value)
        if(duplicateSelected(e.target.value)){
            setHasError(true)
        }else{
            setHasError(false)
        }
        switch(e.target.value){
            case "Size":
               setPlaceHolder("Medium")
                break;
            case "Color":
               setPlaceHolder("Red")
                break;
            case "Material":
               setPlaceHolder("Metals")
                break
            case "Style":
               setPlaceHolder("Style")
        }
        setOptionsValue([''])
    }
    // here we call the callback function to send back the data to the parent component
    const handleDone = ()=>{
        if(hasErrorInSelected)return
        if(error.hasError)return 
        if(onSubmit)
        onSubmit({name:selectedOption,value:optionsValue,index,isEditMode:false})

    }
    
    if(variants?.length===0)return <></>
    return <div className='space-y-4 p-4 border-gray-300 border-b-2 border-dashed'>
            <h2>Option</h2>
        <FormControl sx={{width:'100%'}} className='space-y-4 space-x-3'>
        <Select 
            value = {selectedOption}
            placeholder='Color'
            error={hasErrorInSelected}
            onChange={handleOnSelect}>
            {
                variants.map((value)=>{
                    return <MenuItem  key={value} value={value} selected>{value}</MenuItem>
                })
            }

        </Select>
        {
            hasErrorInSelected?<Alert severity='error'>Duplicate option selected</Alert>:<></>
        }

        <h2>Option value</h2>
        {
             error.hasError?<Alert variant='standard' icon={<ErrorOutline/>} color='error'>{error.message}</Alert>:<></>
        }
        {
            optionsValue.map((value,index)=>{
                return <div key={index} className={` space-x-1 inline-flex items-center`}>
                    {!isEmpty(value)?<PlayArrowSharp className="cursor-pointer w-5 h-5 text-blue-500" />:<span className='w-5 h-5'></span>}
                    <TextField size='small' fullWidth={true} key={index} value={value} onChange={(e)=>handleOnChange(e,index)} placeholder={placeholder}  />
                   {!isEmpty(value)?<DeleteOutline onClick={()=>handleDelete(value)} className="cursor-pointer w-5 h-5 hover:text-red-500" />:<span className='w-5 h-5'></span>}
                </div> 
            })
        }
        </FormControl>
        {
            !isEmpty(optionsValue[0])?<Button onClick={handleDone} variant='outlined' color='primary' >Done</Button>:<></>
        }

    </div>
}
const ShowVaraintSelected = ({name,values,index,onEditMode,onDelete})=>{
    const handleEdit = ()=>{
        if(onEditMode) 
        onEditMode({name,value:values,index,isEditMode:true})
    }

    return <>
       <div className='relative flex'>
            <h2 className='font-bold'>{name}</h2>
        <Stack className='absolute right-3' direction={"row"} gap={2}>
        <span onClick={handleEdit} className='cursor-pointer select-none  hover:text-blue-800'><EditIcon/></span>
        <span onClick={()=>onDelete(index)} className='cursor-pointer select-none  hover:text-red-800'><DeleteIcon/></span>
        </Stack>
            
       </div>
       <Stack direction={"row"} spacing={1}>
            {
                values?.map((value,index)=>{
                    if(isEmpty(value))return <span key={index}></span>
                    return <Chip key={index} label={value}
                        variant='filled'
                        className='select-none cursor-pointer'
                    />
                })
            }
       </Stack>
    </>
}

const AddProductVariant = ({onChangeVariant,value}) => {

    const [varaintOptions,setVariantOptions] = useState([])
    const [addBtnState,setBtnState]= useState({
        name:"Add options",
        isActive:false
    })
    useEffect(()=>{
        if(value){
            setVariantOptions(value)
        }
    },[value])
    useEffect(()=>{
       
        if(varaintOptions?.length>0){
           setBtnState({...addBtnState,name:"Add another option"})
        }else{
            setBtnState({...addBtnState,name:"Add options"})
        }
    },[varaintOptions])
    
    //handle submit || callback function 
    const handleSubmit = ({name,value,index,isEditMode})=>{
        let current_options = [...varaintOptions]
        current_options[index] = {name,value,isEditMode}
        setVariantOptions(current_options)
        onChangeVariant(current_options)
    }
    //handle btn state 
    const addVariant = ()=>{
        const newOption = [...varaintOptions]
        newOption.push({name:"",value:"",isEditMode:true})
        setVariantOptions(newOption)
        onChangeVariant(newOption)
    }
    //handle delete 
    const handleDelete = (index)=>{
            let newOptions = [...varaintOptions] 
            newOptions.splice(index,1)
            if(newOptions.length===0){
                newOptions=[]
            }
            setVariantOptions(newOptions)
            onChangeVariant(newOptions)
    }

    return (<div className='space-y-4  p-2'>
        {
          varaintOptions!==null? varaintOptions?.map(({name,value,isEditMode},index)=>{
                if(!isEmpty(name) && !isEmpty(value) && !isEditMode){
                    return <ShowVaraintSelected onDelete={handleDelete} key={index} onEditMode={handleSubmit} values={value} name={name} index={index}/>
                }
                return <AddProductOptionEditor  options={varaintOptions} key={index} name={name} values={value} index={index} onSubmit={handleSubmit}/>
            }):<></>
        }
        {
            varaintOptions.length<4?<div onClick={addVariant} className='inline-flex justify-center items-center cursor-pointer select-none'>
            <AddIcon fontSize='12px' className='font-bold' /><span className='select-none text-blue-600 hover:underline'>{addBtnState.name}</span>
        </div>:<></>
        }
    
    </div> );
}
 
export default AddProductVariant;