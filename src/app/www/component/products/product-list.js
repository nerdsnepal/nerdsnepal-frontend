import { Box, Pagination, Stack } from "@mui/material";
import ProductItem from "./product-item";
import { useState } from "react";

const ProductList = ({products,justifyContent='center',itemsPerPage=5}) => {
    const totalItems = products?.length
    const [page,setPage] = useState(1)
   const handleChange = (e,value)=>{
        setPage(value)
   }
   
    const NoProductFound = ()=>{
        return <h1 className="p-4">No product found</h1>
    }
    return (<Box gap={2} role="presentation">
    {totalItems==0?<NoProductFound/>:null}
        <Stack display={'flex'} direction={'row'} flexWrap={'wrap'} padding={2} justifyContent={justifyContent} gap={1.2}>
            {
                products?.slice((page-1)*itemsPerPage,page*itemsPerPage).map((product,index)=>{
                    return <ProductItem product={product}  key={index}/>
                })
            }
        </Stack>
        {totalItems>itemsPerPage?<div className="flex w-full justify-center mb-3"><Pagination  className={`pagination-label dark:text-white`} count={Math.ceil(totalItems/itemsPerPage)} onChange={handleChange}  page={page}  /></div>:null}    
    </Box>);
}
 
export default ProductList;