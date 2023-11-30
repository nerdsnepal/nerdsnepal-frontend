import { Box, Typography } from "@mui/material";
import Link from "next/link";

const Address = ({user}) => {
    const RenderAddress = ()=>{
        return <></>
    }
    const NoAddress=()=>{
        return <>
            <Typography>No address</Typography>
            <Link href={'/account/address'}>Add address</Link>
        </>
    }

    return (<Box className='border border-slate-300 bg-gray-50 rounded-md p-4 m-0 mobile:m-0 w-screen mobile:w-fit'>
        <Typography variant="h6" fontWeight={'bold'}>Address</Typography>
        {
            user.address==null?<NoAddress/>:<RenderAddress/>
        }
</Box>);
}
 
export default Address;