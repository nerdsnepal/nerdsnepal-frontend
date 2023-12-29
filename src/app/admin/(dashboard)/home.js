'use client'

import { useSelector } from "react-redux";
import TotalOrders from "../components/home/total-orders";
import { Box, Typography } from "@mui/material";

const AdminHomePage = ()=>{
    const storeId = useSelector((state)=>state.auth.storeId)
    const isSuperUser = useSelector((state)=>state.auth.isSuperAdmin)
    if(storeId===null && !isSuperUser ){return null;}
    return <Box className="w-[100%] h-screen m-1 p-4 " overflow={'auto'}>
        <Box>
        <Typography padding={2} variant="h4">Today&apos;s</Typography>
        <TotalOrders storeId={storeId}  />
        </Box>
    </Box>
}
export default AdminHomePage;