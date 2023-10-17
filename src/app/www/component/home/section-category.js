import { API_URL } from "@/app/lib/utils/utils";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";



const CategoryImage = ({url,name,_id})=>{
    return <Link href={`/category?_id=${_id}`}>
        <Image draggable={false} loading="lazy" placeholder="blur" blurDataURL={API_URL(url+'?q=20')}  className="w-[300px] h-[200px] hover:w-[302px] hover:h-[202] hover:shadow-xl transition-all rounded-md shadow-sm" src={API_URL(url)} alt={name} quality={80} height={1080} width={1080}/>
    </Link>
}

const ShopByCategory = ({categories}) => {
    return (<Stack gap={3} padding={4} flex={'display'} justifyContent={'center'} alignItems={'center'} className="bg-gray-200">
        <Typography className="text-[#0F172A] font-bold">SHOP BY CATEGORY</Typography>
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
       <Button size="small" className="bg-[#0F172A] text-white p-2 px-6" href="/category">Show all</Button>
    </Stack>);
}
 
export default ShopByCategory;