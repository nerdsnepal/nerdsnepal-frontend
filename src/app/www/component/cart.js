import { Close } from "@mui/icons-material";
import { Box, Divider, Stack, Typography } from "@mui/material";
import EmptyCart from "./cart.empty";

const SliderCart = ({anchor,onClose}) => {
    
    return ( <>
       <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
          role="slider">
           <Stack padding={2} direction={'row'} justifyContent={'space-between'}>
           <Typography variant="h6">CART</Typography>
           <Close cursor={'pointer'} onClick={onClose} />
           </Stack>
           <Divider color="#334155" />
           <EmptyCart/>
        </Box>
    </>);
}
 
export default SliderCart;