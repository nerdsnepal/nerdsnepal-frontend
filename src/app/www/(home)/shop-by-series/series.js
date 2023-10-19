'use client'

import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";
import CategoryImage from "../../component/category.image";
import { useSichuFetch } from "../../hooks/use-fetch";
import Link from "next/link";
import SichuBreadCrumbs from "../../component/breadcrumbs";

const Series = () => {
    const breadcrumbs =[
        {value:'Home',url:"/"},
        {value:'SHOP BY SERIES',url:"#"}
    ]
    const {data,isLoading} = useSichuFetch({endPoint:'v2/category',revalidate:90})
    console.log(data);
    if(isLoading)return <h1>Loading...</h1>
    if(!data)return <h1>No series found</h1>
    return (<>
        <Box padding={3}>
        <SichuBreadCrumbs breadcrumbs={breadcrumbs} />
        </Box>
       <Stack padding={1} className="h-screen" direction={'row'} justifyContent={'center'} flexWrap={'wrap'} gap={1}>
       {
            data.map((category,index)=>{
                const url = category?.images[0]?.url
                return <CategoryImage key={index}  url={url} name={category.name} _id={category._id} />
            })
        }
       </Stack>
    
    </>);
}
 
export default Series;