import NotFoundPage from "@/app/admin/not-found";
import { fetchSichu } from "@/app/www/actions/action";
import { authOptions } from "@/app/www/api/auth/[...nextauth]/route";
import { Box, Stack } from "@mui/material";
import { getServerSession } from "next-auth";
import OrderDetail from "./detail";



const AdminOderDetails = async(props) => {
    const session = await getServerSession(authOptions)
    if(!session){
        return <>Something went wrong</>
    }
    const {accessToken} = session.user;
    const {orderId,storeId} = props.searchParams;
    
    if(orderId&&storeId&&accessToken){
        const data = await fetchSichu({accessToken,endPoint:`order/orderdetails/store?orderId=${orderId}&storeId=${storeId}`})
        return <Box className="relative h-screen" overflow={'auto'}> 
            <Stack className="p-3 " justifyContent={'center' } alignItems={'center'}>
            <OrderDetail props={props} accessToken={accessToken} data={data.data}/>
        </Stack>
        <Box className="h-[100px]"/>
        </Box>
    }
    return (<Box>
        <NotFoundPage/>

    </Box>);
}
 
export default AdminOderDetails;