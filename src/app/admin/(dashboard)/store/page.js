"use client";
import { useSession } from "next-auth/react";
import fetchStores from "./action/actions";
import { Suspense, useEffect, useState, useTransition } from "react";
import StoreList from "./components/store-list";
import StoreMenu from "./components/store-menu";
import { Stack } from "@mui/material";
import { NoStore } from "./components/no-store";
import Loading from "@/app/loading";
import { useSelector } from "react-redux";
import StoreLoadingSkeleton from "./components/store-loading-skeleton";


const StorePage = () => {
   const accessToken = useSelector((state)=>state.auth.accessToken)
    const [isLoading,setLoading] = useState(true)
    const [stores,setStores] = useState(null)
    useEffect(()=>{
        try{
            async function requestStore(){
                const result = await fetchStores({accessToken})
                setStores(result.stores)
                setLoading(false)
            }
           requestStore()
        }catch(error){
            setLoading(false)
            //handle error 
        }
      
        
    },[accessToken])
    return (<div className="block p-8">
        <StoreMenu/>
       <Stack className="overflow-auto h-full">
        {
           isLoading?<StoreLoadingSkeleton/>:stores?.length>0?<StoreList stores={stores}  />:<NoStore/>
        }
        </Stack>
    </div>);
}
 
export default StorePage;