'use client'
import { isEmpty } from "@/app/lib/utils/utils";
import { Box, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from "next/navigation";
import Link from "next/link";
const AddProductPageToolbar = ({product,onCancel,onSave}) => {
    const [btnStatus,setBtnStatus] = useState(true)
    useEffect(()=>{
        //here check the btn is need to be enable or disable 
        if(!isEmpty(product.name) && !isEmpty(product?.description) &&
        !isEmpty(product.price.mrp) && !isEmpty(product.mediaUrls)
         && !isEmpty(product.category.name) && product?.inventory?.quantities.length>0){
            setBtnStatus(false)
        }else{
            setBtnStatus(true)
        }
    },[product])


    return (
        <Box className=" m-4 p-2 mobile:w-[92%]">
        <Stack direction={'row'} gap={1}>
        <Link href="/products?selectedView=all&role=merchant"><ArrowBackIosIcon className={"cursor-pointer"} /></Link> <h2>Add Products</h2>
        </Stack>
        <Stack direction={"row-reverse"} gap={1}>
        {/*<Button onClick={(e)=>onCancel()} variant="contained"  className="bg-gray-500 capitalize">Cancel</Button>*/}
        <Button  onClick={(e)=>{if(!btnStatus)onSave()}} disabled={btnStatus} variant="contained" className="capitalize dark:text-white" color="success">Save</Button>
        </Stack>
    </Box>
    );
}
 
export default AddProductPageToolbar;