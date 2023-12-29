'use client'
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import TotalOrders from "../../components/home/total-orders";

export default function AdminAnalytics(){
    const storeId = useSelector((state)=>state.auth.storeId)
    const isSuperUser = useSelector((state)=>state.auth.isSuperAdmin)
    if(storeId===null && !isSuperUser){return null;}
    return <Box>
    <Typography padding={2} variant="h4">Today&apos;s</Typography>
    <TotalOrders storeId={storeId}  />
</Box>
}