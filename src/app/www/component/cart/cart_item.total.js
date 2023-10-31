import { Divider, Stack, Typography } from "@mui/material";
import { currency_code } from "@/app/lib/utils/utils";
const processCart = (items)=>{
    let totalQuantity=0;
    let totalPrice= 0;
    try {
        items.map(({quantity,price})=>{
            totalQuantity += Number(quantity)
         totalPrice += Number(quantity)*Number(price.mrp)

        });
        return {totalPrice,totalQuantity}
    } catch (error) {
        return {totalPrice,totalQuantity}
    }
}
const TotalPrice = ({items}) => {
    const {totalPrice,totalQuantity}  = processCart(items)
    const totalItems = `(${totalQuantity}  ${totalQuantity>1?' items':' item'})`;
    return ( <><Stack direction={'row'} justifyContent={'space-around'} padding={1}>
        <Typography variant="body1" justifySelf={'start'}>Subtotal {totalItems}</Typography>
        <Typography variant="body1">{currency_code + totalPrice}</Typography>
    </Stack><Divider color="#BBBBBB" /><Stack direction={'row'} justifyContent={'space-around'} padding={1}>
            <Typography variant="body1" justifySelf={'start'}>Total</Typography>
            <Typography variant="body1" fontWeight={'bold'}>{currency_code + totalPrice}</Typography>
        </Stack></> 
        );
}
 
export default TotalPrice;