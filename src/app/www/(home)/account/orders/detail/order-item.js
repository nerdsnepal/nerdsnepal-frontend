"use client"
import { API_URL, currency_code, isDateTimeExpired } from "@/app/lib/utils/utils";
import { Box,  Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import ReviewAndCancellation from "./review_or_cancellation";

const  OrderProductItem =({data,acccessToken})=>{
    const [products,setProducts] = useState(data.products)
    const ProductItem = ({product})=>{
        let buttonText = 'Cancel Order'
        let color = 'text-red-400'
        const handleClick = (e)=>{
         const {name} =e.target;
         if(name==='Cancel Order'){
           
         }
        }
        const expirationDuration = 15 * 60 * 1000; 
        if(data.status!=='Pending' || isDateTimeExpired(data.createdAt,expirationDuration)){
            buttonText='Review'
            color='text-blue-400'
        }
        let isCancelled=false;
        product.cancellation?.map((id)=>{
            if(id===product._id){
                isCancelled=true;
            }
        })
        data.reviews?.map((reivew)=>{
            if(reivew.productId===product.productId){
                buttonText = 'Reviewed'
            }
        })
        return (<Box className="w-screen mobile:w-[60vw]">
        <Stack direction={'row'} alignItems={'center'} gap={2}>
            <Image alt=""  className="p-2" height={100} width={100} src={API_URL(product.mediaUrls[0])}/>
            <Typography  className="w-[30vw] overflow-ellipse" variant="body1">{product.name}</Typography>
            <Typography variant="body1">{currency_code+product.price}</Typography>
            <Typography variant="body1">{'Qty:'+product.quantity}</Typography>
            <Box className="w-[5%]"/>
            {
                !isCancelled?null:<Typography className="bg-red-300 text-red-800 p-1 pl-2 pr-2 rounded-lg">Cancelled</Typography>
            }
           {isCancelled?null: <ReviewAndCancellation orderId={data._id} storeId={product.storeId}  productId={product.productId} accessToken={acccessToken} color={color} handleClick={handleClick} name={buttonText} />}
        </Stack></Box>);
    }
    return (<>
        {products.map((product,index)=><ProductItem key={index} product={product}/>)}
    </>);
}
export default OrderProductItem;