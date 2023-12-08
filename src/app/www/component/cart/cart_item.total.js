import { Box, Divider, Stack, Typography } from "@mui/material";
import { currency_code } from "@/app/lib/utils/utils";
const TotalPrice = ({totalPrice,totalQuantity,shippingFee,hasShipping=false}) => {
   const total = totalPrice+shippingFee;
    const totalItems = `(${totalQuantity} ${totalQuantity>1?' items':' item'})`;
    return ( <><Stack  direction={'row'} justifyContent={'space-between'} padding={1}>
        <Typography variant="body1" justifySelf={'start'}>Subtotal{totalItems} </Typography>
        <Box width={10}/>
        <Typography variant="body1"> {currency_code + totalPrice}</Typography>
    </Stack>
    {
        !hasShipping?<Stack  direction={'row'} justifyContent={'space-between'} padding={1}>
        <Typography variant="body1" justifySelf={'start'}>Shipping Fee</Typography>
        <Typography variant="body1"> {currency_code + shippingFee}</Typography>
    </Stack>:<></>
    }
    <Divider color="#BBBBBB" /><Stack direction={'row'} justifyContent={'space-around'} padding={1}>
            <Typography variant="body1" justifySelf={'start'}>Total</Typography>
            <Typography variant="body1" fontWeight={'bold'}>{currency_code + total}</Typography>
        </Stack></> 
        );
}
 
export default TotalPrice;