import { Box, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";
import OrderProductItem from './order-item'
import { currency_code } from "@/app/lib/utils/utils";
import { RenderAddress } from "@/app/www/component/user/address";
const OrderDetail = ({data,accessToken}) => {
    const {storeId,deliveryAddress,billingAddress} = data;
    
    const OrderIdAndPlacedOn = ()=>{
        const id = parseInt(data._id,8)
        return <Box className='bg-slate-50 border p-2 pl-8 pr-8 rounded-md'>
            <Typography>Order #{id}</Typography>
            <Typography>Placed on {new Date(data.createdAt).toLocaleString('default')}</Typography>
        </Box>
    }
    const StoreInfo = ()=>{
        if(!storeId)return null;
        return <Box className="bg-[#EEE] h-fit  text-black w-screen mobile:w-[20vw]  rounded-lg" padding={2}>
            <Typography variant="body1">Sold by</Typography>
           <Link href={`/store?id=${storeId._id}`}>
           <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant="body1" className="text-black" fontWeight={'bold'}>{storeId.name}</Typography>
            </Stack>
            </Link>
        </Box>
    }
    const ShippingAddress =({deliveryAddress,billingAddress})=>{
        if(!deliveryAddress && !billingAddress)return null;
      
        return <Box  className="bg-slate-50 rounded-md h-fit w-screen mobile:w-[50vw] border" padding={2}>
            <Typography variant="body1" fontWeight={'bold'}>Address</Typography>
            <Box height={7}/>
            <Stack direction={'row'} gap={2}>
                <RenderAddress address={deliveryAddress} type={'Delivery Address'} />
                <Box className='w-[0.6px] h-[120px] bg-slate-500'/>
                <RenderAddress address={billingAddress} type={'Billing Address'} />
                <Box width={20}/>
            </Stack>
        </Box>
    }
    const Total = ()=>{
        const {totalAmount,deliveryCharge,products} = data;
        const subTotal = totalAmount-deliveryCharge;
        const items = products.length==1?'1 item':`${products.length} items`
        return <Box className="w-[350px] p-4 bg-slate-50 border rounded-md" gap={2}>
            <Typography fontWeight={'bold'}>Total</Typography>
            <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography>Subtotal ({items})</Typography>
            <Typography>{currency_code}{subTotal}</Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography>Delivery Fee </Typography>
            <Typography>{currency_code}{deliveryCharge}</Typography>
            </Stack>
            <Box height={5}/>
            <Divider/>
            <Box height={5}/>
            <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography>Total Payment </Typography>
            <Typography>{currency_code}{totalAmount}</Typography>
            </Stack>
          <Stack padding={0.5} gap={1} direction={'row'}>
          <Typography className="text-green-700 w-fit bg-green-300 p-1 pl-2 pr-2 rounded-lg">{data.paymentMethod}</Typography> 
          <Typography className="text-blue-700 w-fit bg-blue-300 p-1 pl-2 pr-2 rounded-lg">{data.paymentStatus}</Typography> 
          </Stack>
        </Box>
    }
    return (<Box className="w-[100vw] mobile:w-[70vw] space-y-3" gap={2}>
           <Box height={15}/>
            <Typography fontWeight={'bold'}>Order Details</Typography>
            <Box height={5}/>
        <Stack direction={{xs:'column',md:'row'}} gap={2} justifyContent={'space-between'}> 
        <OrderIdAndPlacedOn/>
        <StoreInfo/>
     </Stack>
       <Box className="p-4 bg-slate-50 border rounded-md overflow-auto">
       <OrderProductItem data={data} acccessToken={accessToken}/>
       </Box>
    <Stack direction={{xs:'column',md:'row'}} gap={2}>
    <ShippingAddress  billingAddress={billingAddress} deliveryAddress={deliveryAddress} />
    <Total/>
    </Stack>
    <Box height={10}/>
    </Box>);
}
 
export default OrderDetail;