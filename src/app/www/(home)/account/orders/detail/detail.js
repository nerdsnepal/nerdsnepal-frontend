import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";

const OrderDetail = ({data}) => {
    const {storeId} = data;
    const OrderIdAndPlacedOn = ()=>{
        const id = parseInt(data._id,8)
        return <Box className='bg-slate-50 border p-2 pl-8 pr-8 rounded-md'>
            <Typography>Order #{id}</Typography>
            <Typography>Placed on {new Date(data.createdAt).toLocaleString('default')}</Typography>
        </Box>
    }
    const StoreInfo = ()=>{
        return <Box className="bg-[#EEE] h-fit  text-black w-screen mobile:w-[20vw]  rounded-lg" padding={2}>
            <Typography variant="body1">Sold by</Typography>
           <Link href={`/store?id=${storeId._id}`}>
           <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant="body1" className="text-black" fontWeight={'bold'}>{storeId.name}</Typography>
            </Stack>
            </Link>
        </Box>
    }
    return (<Box className="w-[100vw] mobile:w-[70vw]">
     <Stack direction={'row'} justifyContent={'space-between'}> 
     <OrderIdAndPlacedOn/>
        <StoreInfo/>
     </Stack>
        
    </Box>);
}
 
export default OrderDetail;