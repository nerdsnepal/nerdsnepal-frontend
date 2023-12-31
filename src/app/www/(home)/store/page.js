import { isEmpty } from "@/app/lib/utils/utils";
import { notFound } from "next/navigation";
import { fetchSichu } from "../../actions/action";
const StoreDetails =lazy(()=>import("../../component/store/store"));
import { Box, Stack } from "@mui/material/index";
const  SichuBreadCrumbs = lazy(()=>import("../../component/breadcrumbs"))
import StoreProductInfo from "./store";
import { Suspense, lazy } from "react";

 const StorePage =async (params) => {
    const {id,tab,q}= params.searchParams;
    if(isEmpty(id)){
        return notFound();
    }
    let data = null;
    try {
     const result=  await fetchSichu({endPoint:`store/v2/storeId?id=${id}`})
     if(result.success){
        data=result.data;
     }
    } catch (error) {
        //do something
    }
    if(data===null){
        return notFound();
    }
    const breadcrumbs =[
        {value:'Home',url:"/"},
        {value:'Store',url:"/store"},
        {value:data.store.name,url:"#"}
    ]
    return ( <Stack justifyContent={'center'} alignItems={'center'} > 
    <Suspense fallback={<></>}>
    <Box className="w-[95vw]">
    <Box padding={3}>
        <SichuBreadCrumbs breadcrumbs={breadcrumbs} />
    </Box>
    <StoreDetails store={data.store} />
    <StoreProductInfo data={data} tab={tab} storeId={id} q={q}  />
    </Box>
    </Suspense>
    </Stack> );
}
 
export default StorePage;