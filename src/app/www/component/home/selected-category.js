"use client"
import { clear, setCategories, setPrice } from "@/app/state/reducer/filter";
import {Chip, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SelectedCategoryForFilter = ({props}) => {
    const {categories,price} = useSelector((state)=>state?.proFilter)
    const [mounted,setMounted] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    const onDelete = (value)=>{
        const newFilter = categories?.filter((_f)=>_f!==value)
        dispatch(setCategories(newFilter))
    }
    const clearFilter = ()=>{
        dispatch(clear())
    }
    useEffect(()=>{
        if(mounted){
            router.replace(`?category=${categories.toString()}&&min=${price?.minimum}&&max=${price?.maximum}`)
        }else{
            try {
                const {category,min,max} = props.searchParams 
                const filter = category.split(',').filter((value)=>value!=='')
                const price = {
                    minimum:Number(min)||0,
                    maximum:Number(max)||0
                }
                console.log(price);
                dispatch(setCategories(filter))
                dispatch(setPrice(price))
            } catch (error) {
               //error
            }
            setMounted(true)
        }

    },[categories,price])
    return (<>
    <Stack display={'flex'} padding={2} direction={'row'} flexWrap={'wrap'} gap={0.5}>
        {
            categories?.map((name,index)=>{
                return <Chip className="dark:text-white" onDelete={()=>onDelete(name)} key={index} label={name} />
            })
        }
    </Stack>
        {
            categories.length>0? <Typography variant="caption" className="hover:cursor-pointer underline" onClick={clearFilter} >Clear all</Typography>:null
        }
    
    </>);
}
 
export default SelectedCategoryForFilter;