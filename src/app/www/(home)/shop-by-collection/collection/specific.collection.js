'use client'
import { API_URL } from "@/app/lib/utils/utils";
import SichuBreadCrumbs from "@/app/www/component/breadcrumbs";
import { useSichuFetch } from "@/app/www/hooks/use-fetch";
import { Box, Skeleton } from "@mui/material";
import Image from "next/image";
import CollectionProduct from "./collection.product";


const SpecificCollection = ({id,props}) => {
    const {data,isLoading} = useSichuFetch({endPoint:'v2/category',revalidate:90})
    if(isLoading)return <Box padding={3}>
        <Skeleton height={200} variant="rounded" />
    </Box>
    if(!data)return <h1>Something went wrong</h1>
    const category = data.filter((_category)=>_category._id===id)
    const breadcrumbs =[
        {value:'Home',url:"/"},
        {value:'SHOP BY COLLECTION',url:"/shop-by-collection"},
        {value:category[0]?.name,url:"#"}
    ]
    return ( <Box padding={{xs:1,md:4}} className="transition-all">
        <SichuBreadCrumbs  breadcrumbs={breadcrumbs} />
        <Image draggable={false} className="w-full object-cover h-[111px] mobile:h-[333px] rounded-md mt-5 aspect-video m-auto" loading="lazy"  src={API_URL(category[0]?.images[0].url)} width={1920 } height={1080} alt={category[0]?.name} />
        <CollectionProduct category={category[0]} props={props} />
    </Box>);
}
 
export default SpecificCollection;