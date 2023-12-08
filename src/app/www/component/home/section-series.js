import { Box, Button, Stack, Typography } from "@mui/material";
import CategoryImage from "../category.image";
import Link from "next/link";

const ShopBySeriesSection = ({series}) => {
    if(!series){
        return <></>
    }
    if(series.length===0)return <></>

    return (<Stack gap={3} padding={4} flex={'display'} justifyContent={'center'} alignItems={'center'} className="bg-gray-200">
        <Typography className="text-[#0F172A] font-bold">SHOP BY SERIES</Typography>
       <Box className="w-[90%] m-4">
       <Stack direction={"row"}  flexWrap={'wrap'} display={'flex'} gap={1.2}>
                {
                    series?.slice(0,8).map((_series,index)=>{
                        const url = _series?.images[0]?.url
                        return <CategoryImage key={index}  url={url} name={_series.name} _id={_series._id} />
                    })
                }
            </Stack>
       </Box>
       <Link href={'/shop-by-series'}><Button size="small" className="bg-[#0F172A] text-white p-2 px-6">Show all</Button></Link>
    </Stack>);
}
 
export default ShopBySeriesSection;