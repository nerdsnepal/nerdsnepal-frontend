'use client'
import { Box, Pagination, Skeleton, Stack, Typography } from "@mui/material";
import { useSichuFetch } from "../../hooks/use-fetch";
import SichuBreadCrumbs from "../../component/breadcrumbs";
import { useState } from "react";
import { CategoryItem } from "../../component/category-item";

const Collection = ({itemsPerPage=16,horiZ=false}) => {
    const breadcrumbs =[
        {value:'Home',url:"/"},
        {value:'SHOP BY COLLECTION',url:"#"}
    ]
    const [page,setPage] = useState(1)
    const handleChange = (e,value)=>{
        setPage(value)
   }
  
   const {data,isLoading} = useSichuFetch({endPoint:'v2/category',revalidate:90})
    if(isLoading && horiZ)return <Stack gap={2}>
        <Skeleton height={140}  variant="rectangular" />
        <Skeleton height={140} variant="rectangular"  />
        <Skeleton height={140} variant="rectangular" />
    </Stack>
    if(isLoading )return <Stack justifyContent={'center'} gap={2} padding={2} direction={'row'} flexWrap={"wrap"} >
       {
        [1,2,3,1,2,2,3].map((index)=><Skeleton key={index} variant="rounded" height={"200px"} width={'300px'} />)
       }
    </Stack>
    if(!data)return <h1>No collection found</h1>
    const totalItems = data?.length;
    
    if(horiZ){
       return <Box>
            <Typography variant="body1" padding={2} fontWeight={'bold'} >Collection</Typography>
            <Stack padding={1} direction={'column'}  className="h-fit" justifyContent={'center'} flexWrap={'wrap'} gap={1}>
            {
                data?.slice((page-1)*itemsPerPage,page*itemsPerPage).map((category,index)=>{
                    const url = category?.images[0]?.url
                    return <CategoryItem width="180px" height="140px" href={`/shop-by-collection/collection?_id=${category._id}`} key={index}  url={url} name={category.name} _id={category._id} />
                })
            }
       </Stack>
        </Box>
    }
    return (<Box className="h-full min-h-[50vh]">
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
       {totalItems>itemsPerPage?<div className="flex justify-center mb-3"><Pagination  className={`pagination-label text-black`} count={Math.ceil(totalItems/itemsPerPage)} onChange={handleChange}  page={page}  /></div>:null}  
   
    </Box>);
}
 
export default Collection;