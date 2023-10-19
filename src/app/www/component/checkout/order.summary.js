import { Box, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import OrderItem from "./order.item";


const OrderSummary = () => {
    const items = useSelector((state)=>state.cart.items)
    return (<Box role="presentation" className="border w-full mobile:w-[50vw]" padding={1} >
           <Typography variant="h6" marginTop={2} marginBottom={2}>Order Summary</Typography>
         <Stack role="list" gap={1} className="w-full mobile:w-[80%]">
         {
                items.map((product,index)=>{
                    return <OrderItem product={product} key={index} />
                })
            }
         </Stack>

    </Box>);
}
 
export default OrderSummary;