'use client'
import {  Box, Button, Stack, Typography } from "@mui/material";
import { ShippingDetails } from "../../component/checkout/order.shipping";
import OrderSummary from "../../component/checkout/order.summary";
import { useSelector } from "react-redux";
import TotalPrice from "../../component/cart/cart_item.total";
import Link from "next/link";

const CheckoutPage = () => {
    const items = useSelector((state)=>state.cart.items);
    const user = useSelector((state)=>state.auth.user);

    const Auth = ()=>{
        return <Box>
            <Button><Link href={'/register'}>Register</Link></Button>
            <Button><Link href={'/login'}>Login</Link></Button>
        </Box>
    }

    return (<Box className="min-h-[50vh] bottom-6" >
    <Stack direction={{xs:"column",md:"row"}}  gap={1} justifyContent={'start'} alignItems={'start'}>
    <Stack gap={1.5} className="w-full mobile:w-[65vw]" padding={{xs:1,md:3}}>
       {
        user==null?<Auth/>: <ShippingDetails user={user} />
       }
        <OrderSummary items={items}/>
   </Stack>
   {
        items.length>0?<Box className="border h-fit relative shadow-md top-8  w-full mobile:w-fit bg-white" padding={3}  >
            <Typography variant="h6" fontWeight={'bold'}>Procceed</Typography>
            <Box height={50}></Box>
        <TotalPrice items={items}  />
        <Button  fullWidth variant="contained" className="bg-blue-500 rounded-md">Place Order</Button>
        </Box>:null
    }
  </Stack>
</Box>);
}
 
export default CheckoutPage;