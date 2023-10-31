import { Box, Button } from "@mui/material";
import TotalPrice from "./cart_item.total";



const CartProcessed = ({items}) => {
  
    return (<Box role="presentation" padding={2} margin={1}>
        <TotalPrice items={items} />
        <Button fullWidth className="bg-blue-500 mt-2 text-white" variant="contained"> Checkout</Button>
    </Box>);
}
 
export default CartProcessed;