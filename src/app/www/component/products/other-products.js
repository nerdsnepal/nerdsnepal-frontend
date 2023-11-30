//Other products related to the current store 

import { Box, Stack, Typography } from "@mui/material";
import { useSichuFetch } from "../../hooks/use-fetch";
import Image from "next/image";
import { API_URL, currency_code, getCompareAtPrice } from "@/app/lib/utils/utils";
import Link from "next/link";

const OtherProducts = ({product}) => {
    const {data,isLoading} = useSichuFetch({endPoint:`products?storeId=${product.storeId}`})
    if(isLoading)return null
  let products = data?.products?.filter((_product)=>_product._id!==product._id)
    
    const StoreInfo = ()=>{
        return <Box className="bg-[#EEE] h-fit  text-black w-screen mobile:w-[20vw]  rounded-lg" padding={2}>
            <Typography variant="body1">Sold by</Typography>
           <Link href={`/store?id=${data?.store?._id}`}>
           <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant="body1" fontWeight={'bold'}>{data?.store?.name}</Typography>
            <Image draggable={false} src={API_URL(data?.store?.logo)} className="w-fit h-fit max-w-12 max-h-12 aspect-square" alt={data?.store?.name} width={1080} height={1080} />
            </Stack>
            </Link>
        </Box>
    }
    const ProductListItem = ({product})=>{
        const {compare_at,discountPer} = getCompareAtPrice({compareAt:product.price.compare_at,mrp:product.price.mrp});
        return <Link  href={`/product?_id=${product._id}`}> <Box className="border-[1px] dark:text-white h-[250px] w-[160px] mobile:w-auto mobile:h-[95px] rounded-lg">
            <Stack direction={{xs:'column',md:'row'}} gap={2}> 
             <Image draggable={false} src={API_URL(product.mediaUrls[0])} className="w-full mobile:w-[95px] overflow-hidden rounded-lg h-[140px] mobile:h-[95px] aspect-square" alt={data?.store?.name} width={1080} height={1080} />
             <Stack direction={'column'} padding={1}>
                <Typography variant="body1" className="text-ellipsis" fontWeight={'bold'}>{product.name}</Typography>
                <Typography variant="body2">{currency_code+product.price.mrp}</Typography>
                {
                    compare_at>0?
                <Stack direction={'row'} gap={2}>
                    <Typography variant="caption" className="text-slate-400" component="s">{currency_code+product.price.compare_at}</Typography>
                    <Typography variant="caption" className="text-slate-400">{`-${discountPer}%`}</Typography>
                </Stack>
            :null
        }
            </Stack>
        </Stack>
        </Box>
        </Link>
    }

    return (
    <Stack direction={'column'} gap={2}>
        <StoreInfo/>
        <Stack direction={{xs:'row',md:'column'}} className="overflow-x-auto mobile:overflow-hidden" gap={2}>
        {
            products?.map((product,index)=><ProductListItem  product={product} key={index} />)
        }
          </Stack>
        </Stack>);
}
 
export default OtherProducts;