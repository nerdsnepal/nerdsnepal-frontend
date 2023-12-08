'use client'

import { Box, Pagination, Stack } from "@mui/material";
import CategoryImage from "../../component/category.image";
import { useSichuFetch } from "../../hooks/use-fetch";
import SichuBreadCrumbs from "../../component/breadcrumbs";
import { useState } from "react";
import { CategoryItem } from "../../component/category-item";

const Collection = ({itemsPerPage=16}) => {
    const breadcrumbs =[
        {value:'Home',url:"/"},
        {value:'SHOP BY COLLECTION',url:"#"}
    ]
    const [page,setPage] = useState(1)
    const handleChange = (e,value)=>{
        setPage(value)
   }
  
   const {data,isLoading} = useSichuFetch({endPoint:'v2/category',revalidate:90})
    console.log(data);
    if(isLoading)return <h1>Loading...</h1>
    if(!data)return <h1>No collection found</h1>
    const totalItems = data?.length
    return (<Box className="h-full">
        <Box padding={3}>
        <SichuBreadCrumbs breadcrumbs={breadcrumbs} />
        </Box>
       <Stack padding={1} direction={'row'}  className="h-fit" justifyContent={'center'} flexWrap={'wrap'} gap={1}>
       {
            data?.slice((page-1)*itemsPerPage,page*itemsPerPage).map((category,index)=>{
                const url = category?.images[0]?.url
                return <CategoryItem height="200px" href={`/shop-by-collection/collection?_id=${category._id}`} key={index}  url={url} name={category.name} _id={category._id} />
            })
        }
       </Stack>
       {totalItems>itemsPerPage?<div className="flex justify-center mb-3"><Pagination  className={`pagination-label dark:text-white`} count={Math.ceil(totalItems/itemsPerPage)} onChange={handleChange}  page={page}  /></div>:null}  
   
    </Box>);
}
 
export default Collection;