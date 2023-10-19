import { API_URL, currency_code } from "@/app/lib/utils/utils";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

const OrderItem = ({product}) => {
    return (<Box>
       <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
       <Stack direction={'row'}  gap={2} alignItems={'center'} justifyContent={'center'}>
       <Image draggable={false} src={API_URL(product?.mediaUrls[0])}
         alt="" height={95} width={114}
         className="mobile:w-[114px] mobile:h-[95px] w-[52px] h-[52px] object-fill rounded-l-md" />
        <Typography>{product?.name}</Typography>
       </Stack>
        <Typography>Qty: {product?.quantity}</Typography>
        <Typography>{currency_code+product?.price.mrp}</Typography>
       </Stack>
    </Box>);
}
 
export default OrderItem;