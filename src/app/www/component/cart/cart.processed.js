import { Box, Button } from "@mui/material";
import TotalPrice from "./cart_item.total";
import Link from "next/link";
import { processCart } from "@/app/lib/utils/utils";



const CartProcessed = ({items}) => {
    const {totalPrice,totalQuantity} = processCart(items)
    return (<Box role="presentation" padding={2} margin={1}>
        <TotalPrice  totalPrice={totalPrice} shippingFee={0}  totalQuantity={totalQuantity} hasShipping={true} />
        <Button fullWidth className="bg-blue-500 mt-2 text-white" variant="contained"><Link className="w-screen text-white"  href={'/checkout'}>Checkout</Link></Button>
    </Box>);
}
 
export default CartProcessed;