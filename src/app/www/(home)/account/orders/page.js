import { authOptions } from "@/app/www/api/auth/[...nextauth]/route";
import AllOrders from "@/app/www/component/orders/all-orders";
import { Box, Typography } from "@mui/material/index";
import { getServerSession } from "next-auth";
export const metadata={
    title:"Orders"
}
const Page = async() => {
    const session = await getServerSession(authOptions)
    if(!session){
        return <>Something went wrong</>
    }
    const {accessToken} = session.user;
    return (<Box className='p-4 min-h-[50vh]'>
        <Typography variant="h6" pl={1}>My orders</Typography> 
        <AllOrders accessToken={accessToken} />
    </Box>);
}
 
export default Page;