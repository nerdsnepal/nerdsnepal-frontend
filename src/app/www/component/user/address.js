import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { CountryCode } from "../country-input-field";
import { getDefaultAddress } from "@/app/lib/utils/utils";


export const RenderAddress = ({address,type})=>{
    return <Box className="w-full mobile:w-[48%]">
        <Typography variant="caption" className="text-slate-500">{type}</Typography>
    <Typography fontWeight={'bold'}>{address.fullName}</Typography>
    <Box height={10}/>
    <Typography variant="body2">{address.landmark}, {address.address1}</Typography>
    <Typography variant="body2">{address.state} - {address.city}</Typography>
    <Typography variant="body2">+({CountryCode(address.country)}) {address.phoneNumber}</Typography>
    </Box>
}
const Address = ({user}) => {
    const NoAddress=()=>{
        return <>
            <Typography>No address</Typography>
            <Link href={'/account/address'}>Add address</Link>
        </>
    }
    let address = null;
    let hasDefault = true;
    if(user.address){
    address=   getDefaultAddress({address:user.address});
     if(!address){
        address = user.address;
        hasDefault=false;
     }
    }
    if(address.length===0){
        return <Box className='border border-slate-300 bg-gray-50 rounded-md p-2 m-0 mobile:m-0 w-screen mobile:w-fit'><NoAddress/></Box>;
    }
    
    return (<Box className='border border-slate-300 bg-gray-50 rounded-md p-4 m-0 mobile:m-0 w-screen mobile:w-fit'>
        <Typography variant="h6" fontWeight={'bold'}>Address</Typography>
        {
            <Stack direction={{xs:'column',md:'row'}} className="w-screen mobile:w-[35vw]">
                <RenderAddress address={address[0].delivery} type={`${hasDefault?'Default':''} Delivery Address`} />
                <RenderAddress address={address[0].billing}type={`${hasDefault?'Default':''} Billing Address`} />
            </Stack>
        }
</Box>);
}
 
export default Address;