import { Box } from "@mui/material";
import CartItem from "./cart.item";
const CartList = ({items}) => {
    return (<Box role="list" gap={1} justifyContent={'start'} className="h-[65vh] overflow-auto">
        {
            items.map((product,index)=>{
                return <CartItem product={product} key={index}/>
            })
        }

    </Box>);
}
 
export default CartList;