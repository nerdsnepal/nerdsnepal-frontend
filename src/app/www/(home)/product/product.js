"use client"

import { Box, Stack, Typography } from "@mui/material";
import CustomProductSlider from "../../component/products/custom-product-swiper";
import { useSichuFetch } from "../../hooks/use-fetch";
import AddToCartAndDetails from "../../component/products/add-to-cart-and-details";
import OtherProducts from "../../component/products/other-products";
import ProductReview from "../../component/products/product-review";
import Collection from "../shop-by-collection/collection";
import Loading from "./loading";



const Product = ({props}) => {
    const {data,isLoading,error} = useSichuFetch({ endPoint: `v2/product?_id=${props.searchParams?._id}`,revalidate:20 })
    if(isLoading)return <Loading/>
    if(!data)return <h1>Product not found</h1>
    const Description = ()=>{
        return <Stack margin={{xs:1,md:0}}>
            <Typography variant="body1" className="font-bold">Product Description</Typography>
            <Typography dangerouslySetInnerHTML={{ __html: data?.description }}></Typography>
        </Stack>
    }
    return (<Box>
    <Stack direction={{xs:'column',md:'row'}} padding={{xs:0,md:4}} gap={4}>
    <Stack direction={'column'}>
            {/* Product Details */}
            <Box>
            <Stack  direction={{xs:'column',md:"row"}} gap={2}>
            <CustomProductSlider product={data} />
            <AddToCartAndDetails  total={data.totalQuantity} product={data} />
            </Stack>
            </Box>
            <div className="w-[100vw] mobile:w-[72vw]">
                <Box height={50}/>
                <Description/>
                <ProductReview productId={props.searchParams?._id} />
             </div>
    </Stack>
    <Box>
    <OtherProducts product={data}/>
    <Collection horiZ={true}  />
    </Box>
    </Stack>
    <Box height={50}/>
    </Box>);
}
 
export default Product;