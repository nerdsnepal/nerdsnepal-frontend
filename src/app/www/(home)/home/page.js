'use client'
import { Box } from "@mui/material";
import ProductSlider from "../../component/home/product-slider";
import ShopByCategory from "../../component/home/section-category";
import { useSichuFetch } from "../../hooks/use-fetch";
import Loading from "./home-loading";
import TrendingProducts from "../../component/trending/trending";
import ShopBySeriesSection from "../../component/home/section-series";

const MainPageSection = () => {
    const {data,isLoading} = useSichuFetch({endPoint:""})
    if(isLoading)return <Loading/>
    return (<Box>
        <ProductSlider products={data?.products}/>
        <Box height={20}/>
        <TrendingProducts/>
        <Box height={20}/>
        <ShopByCategory categories={data?.categories} />
        <Box height={20}/>
        <ShopBySeriesSection series={data?.series} />
        <Box height={50}/>
    </Box>);
}
 
export default MainPageSection;