"use client"

import { Box, Button, Stack, Typography } from "@mui/material";
import { useSichuFetch } from "../../hooks/use-fetch";
import ProductItem from "../products/product-item";
import Loading from "./trending.skeleton";
import Link from "next/link";

const TrendingProducts = () => {
    const {data,isLoading} = useSichuFetch({endPoint:"trending/",revalidate:25})
    if(isLoading)return <Loading/>
    if(data?.length===0)return null;
    return (<Stack  direction={'column'} gap={2}  padding={1} className="w-full"  justifyContent={'center'} alignItems={'center'} >
    <Typography className="text-[#0F172A] dark:text-white font-bold">TRENDING NOW</Typography>
   <Box>
   <Stack direction={"row"}  flexWrap={'wrap'} padding={1}  justifyContent={'center'} gap={1.2}>
         {
            data?.slice(0,4).map((product,index)=><ProductItem product={product} key={index}/>)
         }
        </Stack>
   </Box>
   <Link href="/shop-all"><Button size="small" className="bg-[#0F172A] text-white p-2 px-6" >Shop all</Button></Link>
</Stack>);
}

export default TrendingProducts;