'use client'

import { Box, Pagination, Skeleton, Stack } from "@mui/material";
import { useState } from "react";
import SichuBreadCrumbs from "@/app/www/component/breadcrumbs";
import { useSichuFetch } from "@/app/www/hooks/use-fetch";
import CategoryImage from "@/app/www/component/category.image";
const Series = ({itemsPerPage=16}) => {
    const breadcrumbs =[
        {value:'Home',url:"/"},
        {value:'SHOP BY SERIES',url:"#"}
    ]
    const [page,setPage] = useState(1)
    const handleChange = (e,value)=>{
        setPage(value)
   }
  
    const {data,isLoading} = useSichuFetch({endPoint:'admin/series/all',revalidate:90})

    if(isLoading )return <Stack justifyContent={'center'} gap={2} padding={2} direction={'row'} flexWrap={"wrap"} >
        {
        [1,2,3,1,2,2,3].map((index)=><Skeleton key={index} variant="rounded" height={"200px"} width={'300px'} />)
        }
    </Stack>
    if(!data)return <h1>No series found</h1>
    const totalItems = data?.length
    return (<Box className="h-full min-h-[50vh]">
        <Box padding={3}>
        <SichuBreadCrumbs breadcrumbs={breadcrumbs} />
        </Box>
       <Stack padding={1} direction={'row'}  className="h-fit" justifyContent={'center'} flexWrap={'wrap'} gap={1}>
       {
            data?.slice((page-1)*itemsPerPage,page*itemsPerPage).map((category,index)=>{
                const url = category?.images[0]?.url
                return <CategoryImage key={index}  url={url} name={category.name} _id={category._id} />
            })
        }
       </Stack>
       {totalItems>itemsPerPage?<div className="flex justify-center mb-3"><Pagination  className={`pagination-label text-black`} count={Math.ceil(totalItems/itemsPerPage)} onChange={handleChange}  page={page}  /></div>:null}  
    </Box>);
}
 
export default Series;