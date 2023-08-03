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
    const [isPending,startTransition] = useTransition()
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
    console.log(stores);
    return (<section className="p-8">
        <StoreMenu/>
        <div className="h-[7vh]"></div>
       {
        stores?.length>0? <StoreList stores={stores}/>:<p>No store</p>
       }

    </section>);
}
 
export default StorePage;