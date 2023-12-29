"use client"
import { API_URL, currency_code, isDateTimeExpired } from "@/app/lib/utils/utils";
import { Box,  Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import ReviewAndCancellation from "./review_or_cancellation";

const  OrderProductItem =({data,acccessToken})=>{
    const [products,setProducts] = useState(data.products)
    const ProductItem = ({product})=>{
        return (<Box className="w-screen mobile:w-[60vw]">
        <Stack direction={'row'} alignItems={'center'} gap={2}>
            <Image alt=""  className="p-2" height={100} width={100} src={API_URL(product.mediaUrls[0])}/>
            <Typography  className="w-[30vw] overflow-ellipse" variant="body1">{product.name}</Typography>
            <Typography variant="body1">{currency_code+product.price}</Typography>
            <Typography variant="body1">{'Qty:'+product.quantity}</Typography>
            <Box className="w-[5%]"/>
           
        </Stack></Box>);
    }
    return (<>
        {products.map((product,index)=><ProductItem key={index} product={product}/>)}
    </>);
}
export default OrderProductItem;