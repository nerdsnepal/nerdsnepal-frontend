'use client'
import { API_URL } from "@/app/lib/utils/utils";
import SichuBreadCrumbs from "@/app/www/component/breadcrumbs";
import { useSichuFetch } from "@/app/www/hooks/use-fetch";
import { Box, Skeleton } from "@mui/material";
import Image from "next/image";
import SeriesProduct from "./series.product";


const SpecificSeries = ({id}) => {
    const {data,isLoading} = useSichuFetch({endPoint:'admin/series/all',revalidate:90})
    if(isLoading)return <Box padding={4} height={200}><Skeleton  height={200}   /><Box height={50}/></Box>
    if(!data)return <h1>Something went wrong</h1>
    const series = data.filter((_category)=>_category._id===id)
    const breadcrumbs =[
        {value:'Home',url:"/"},
        {value:'SHOP BY SERIES',url:"/shop-by-series"},
        {value:series[0]?.name,url:"#"}
    ]
    return ( <Box padding={{xs:1,md:4}} className="transition-all min-h-[50vh]">
        <SichuBreadCrumbs  breadcrumbs={breadcrumbs} />
        <Image draggable={false} className="w-full object-cover h-[111px] mobile:h-[333px] rounded-md mt-5 aspect-video m-auto" loading="lazy"  src={API_URL(series[0]?.images[0].url)} width={1920 } height={1080} alt={series[0]?.name} />
        <SeriesProduct series={series[0]} />
    </Box>);
}
 
export default SpecificSeries;