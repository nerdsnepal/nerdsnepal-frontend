"use client";
import { useSession } from "next-auth/react";
import fetchStores from "./action/actions";
import { useEffect, useState, useTransition } from "react";
import StoreList from "./components/store-list";
import StoreMenu from "./components/store-menu";

export const metadata={
    title:"Store"
}
const StorePage = () => {
    const {data,status} = useSession();

    const [stores,setStores] = useState(null)
    useEffect(()=>{
        async function fetch(accessToken){
            const result = await fetchStores({accessToken})
            setStores(result.stores)
        }
        if(status==="authenticated"){
            const accessToken = data.user.accessToken
            fetch(accessToken)
        }
        
    },[])
    return (<div className="p-8">
        <StoreMenu/>
       {
        stores?.length>0? <StoreList stores={stores}  />:<p>No store</p>
       }

    </div>);
}
 
export default StorePage;