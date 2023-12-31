import { authOptions } from "@/app/www/api/auth/[...nextauth]/route";
import AllOrders from "@/app/www/component/orders/all-orders";
import  Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
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
       <Suspense fallback={<></>}>
       <AllOrders accessToken={accessToken} />
       </Suspense>
    </Box>);
}
 
export default Page;