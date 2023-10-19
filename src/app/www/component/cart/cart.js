import { Close } from "@mui/icons-material";
import { Box, Divider, Stack, Typography } from "@mui/material";
import EmptyCart from "./cart.empty";
import CartList from './cart.list';
import { useSelector } from "react-redux";
import CartProcessed from "./cart.processed";

const SliderCart = ({anchor,onClose}) => {
    let items = useSelector((state)=>state.cart.items)
    return ( <>
       <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 320 }}
          role="slider">
           <Stack padding={2} direction={'row'} justifyContent={'space-between'}>
           <Typography variant="h6">CART</Typography>
           <Close cursor={'pointer'} onClick={onClose} />
           </Stack>
           <Divider color="#334155" />
            {
                items.length>0?<CartList items={items} />:<EmptyCart/>
            }
           {
            items.length>0?  <CartProcessed items={items} />:null
           }
        </Box>
    </>);
}
 
export default SliderCart;