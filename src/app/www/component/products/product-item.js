import { API_URL, currency_code } from "@/app/lib/utils/utils";
import { Card, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const ProductItem = ({product}) => {
    const url = product?.mediaUrls[0]
    return (<Link href={`/product?_id=${product._id}`}><Card className="rounded-sm cursor-pointer h-fit mobile:w-[250px] w-[152px]" elevation={0}>
        <Image draggable={false} loading="lazy" placeholder="blur" blurDataURL={API_URL(url+'?q=20')} className="w-full h-[140px] aspect-video mobile:h-[250px] select-none" src={API_URL(url)} alt={product.name} width={1024} height={1024} />
        <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} padding={1.5}>
        <Typography variant="body1">{product.category.name}</Typography>
        <Typography variant="body1">{product.name}</Typography>
        <Typography variant="body1">{currency_code+product.price.mrp}</Typography>
        </Stack>
    </Card></Link>);
}
 
export default ProductItem;