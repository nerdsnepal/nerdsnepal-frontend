import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Quantity from "../products/quantity";
import { API_URL, currency_code } from "@/app/lib/utils/utils";
import { useDispatch } from "react-redux";
import { updateQuantity } from "@/app/state/reducer/cart";

const CartItem = ({product}) => {
    const dispatch = useDispatch()
  const handleOnChange=(value)=>{
     dispatch(updateQuantity({...product,quantity:value}))
  }
    return (
        <Box role="presentation" className="h-fit" padding={1}>
            <Stack direction={'row'} gap={2}>
                <Image src={API_URL(product?.mediaUrls[0])} loading="lazy" height={95} draggable={false}
                 width={114} className="w-[114px] h-[95px] object-fill overflow-hidden"
                  alt="" />
                <Box role="contentinfo">
                    <Typography role="contentinfo" variant="body1">{product?.name}</Typography>
                    <Typography role="contentinfo" variant="body1" fontWeight={'bold'}>{currency_code+product?.price?.mrp}</Typography>
                   <Box width={125}>
                   <Quantity onChange={handleOnChange} value={product?.quantity} hideLabel={true} gap={2} padding={0.3} />
                   </Box>
                </Box>
            </Stack>
        </Box>
 );
}
 
export default CartItem;
