"use client";
import { useSession } from "next-auth/react";
import fetchStores from "./action/actions";
import {  useEffect, useState, useTransition } from "react";
import StoreList from "./components/store-list";
import StoreMenu from "./components/store-menu";
import { Box, Stack } from "@mui/material";
import { NoStore } from "./components/no-store";
import { useSelector } from "react-redux";
import StoreLoadingSkeleton from "./components/store-loading-skeleton";


const StorePage = () => {
   const accessToken = useSelector((state)=>state.auth.accessToken)
    const [isLoading,setLoading] = useState(true)
    const [stores,setStores] = useState(null)
    useEffect(()=>{
        // const abortController = new AbortController();
        // const signal = abortController.signal;
        fetchStores({accessToken}).then((val)=>{
                setStores(val.stores)
                setLoading(false)
        }).catch((error)=>{
            setLoading(false) 
        })
    },[accessToken])
    return (<Stack padding={2} flexDirection={'column'}>
     <StoreMenu/>
    <Box>
       
       <Stack className="overflow-auto h-full">
        {
           isLoading?<StoreLoadingSkeleton/>:stores?.length>0?<StoreList stores={stores}  />:<NoStore/>
        }
        </Stack>
    </Box>
    </Stack>);
}
 
export default StorePage;