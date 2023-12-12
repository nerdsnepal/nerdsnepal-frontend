'use client'
import {  Box, Button, Stack, Typography } from "@mui/material";
import { ShippingDetails } from "../../component/checkout/order.shipping";
import OrderSummary from "../../component/checkout/order.summary";
import {  useSelector } from "react-redux";
import TotalPrice from "../../component/cart/cart_item.total";
import { getDefaultAddress, isEmpty, processCart } from "@/app/lib/utils/utils";
import { postRequestSichu } from "../../actions/action";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PaymentMethod from "./paymentmethod";

const CheckoutPage = ({user,accessToken,props}) => {
    const router = useRouter()
    const {orderId} =props.searchParams;
    const items = useSelector((state)=>state.cart.items);
    const {totalPrice,totalQuantity}  = processCart(items)
    const [order,setOrder] = useState(null)
    const shippingFee = 0;
    const total = totalPrice+shippingFee;
    let address = null;
    if(user && user.address){
      address =  getDefaultAddress({address:user.address})
    }
    if(!address){
         if( user && user.address && user.address.length>1){
            address=user.address;
         }
    }
    const handleOrder = async(e)=>{
        if(e.target.name==="order_placed"){
            return;
        }
        let products=[];
        const billingAddress = address[0].billing;
        const deliveryAddress = address[0].delivery;
        items.map((item)=>{
         products.push({
            "name":item.name,
            "mediaUrls":item.mediaUrls,
            "price":Number(item["price"].mrp),
            "quantity":item.quantity,
            "storeId":item.storeId,
            "productId":item._id
         });
        })
        const storeId = products[0].storeId;
     const body={
        billingAddress,
        deliveryAddress,
        "totalAmount":total,
        deliveryCharge:shippingFee,
        products,
        storeId
     }
   try {
    const result = await  postRequestSichu({accessToken,body,endPoint:"order",method:"POST"})  
    if(result.success){
        setOrder(result.data)
        router.replace(`?orderId=${result.data._id}&paymentMethod=${result.data.paymentMethod}&paymentStatus=${result.data.paymentStatus}`)
    }
   } catch (error) {
    
   }

    }
  
    return (<Box className="min-h-[50vh] bottom-6" >
    <Stack direction={{xs:"column",md:"row"}}  gap={1} justifyContent={'start'} alignItems={'start'}>
    <Stack gap={1.5} className="w-full mobile:w-[65vw]" padding={{xs:1,md:3}}>
       {
        user===undefined ?null:<ShippingDetails  address={address} user={user} />
       }
        <OrderSummary items={items} />
   </Stack>
   {
        items.length>0?<Box className="border h-fit relative shadow-sm top-8  w-full mobile:w-fit bg-slate-50" padding={3}  >
            <Typography variant="h6" fontWeight={'bold'}>Payment</Typography>
            <Box height={20}></Box>
        <TotalPrice  shippingFee={shippingFee} totalPrice={totalPrice} totalQuantity={totalQuantity}  />
        <Button onClick={handleOrder} name={order===null? 'place_order':'order_placed'}  fullWidth variant="contained" className="bg-blue-500 rounded-md" disabled={user===undefined || user.address.length===0 }>{order===null&& isEmpty(orderId) ? 'Place Order':'Order Placed'}</Button>
        {
            order!==null||!isEmpty(orderId) ?<PaymentMethod accessToken={accessToken} props={props}/>:null
        }
        <Box height={10}></Box>
        </Box>:null
    }
  </Stack>
</Box>);
}
 
export default CheckoutPage;