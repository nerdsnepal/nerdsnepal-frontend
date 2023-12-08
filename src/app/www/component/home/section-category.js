import { Box, Button, Stack, Typography } from "@mui/material";
import CategoryImage from "../category.image";
import Link from "next/link";

const ShopByCategory = ({categories}) => {
    return (<Stack gap={3} padding={4} flex={'display'} justifyContent={'center'} alignItems={'center'} className="bg-gray-200">
        <Typography className="text-[#0F172A] font-bold">SHOP BY COLLECTIONS</Typography>
       <Box className="w-[90%]">
       <Stack direction={"row"}  flexWrap={'wrap'} display={'flex'} gap={1.2}>
                {
                    categories?.slice(0,8).map((category,index)=>{
                        const url = category?.images[0]?.url
                        return <CategoryImage key={index}  url={url} name={category.name} _id={category._id} />
                    })
                }
            </Stack>
       </Box>
       <Link href={'/shop-by-collection'}><Button size="small" className="bg-[#0F172A] text-white p-2 px-6">Show all</Button></Link>
    </Stack>);
}
 
export default ShopByCategory;