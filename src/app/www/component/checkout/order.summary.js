import { Box, Stack, Typography } from "@mui/material";
import OrderItem from "./order.item";


const OrderSummary = ({items}) => {
    
    if(items.length<=0)return null;
    return (<Box role="presentation" className="border rounded-md h-fit overflow-scroll bg-slate-50 max-h-[60vh] "  >
           <Typography variant="h6" fontWeight={'bold'} className=" top-0" padding={2}>Order Summary</Typography>
         <Stack role="list" gap={1} padding={2} className="w-full mobile:w-[80%]">
         {
                items.map((product,index)=>{
                    return <OrderItem product={product} key={index} />
                })
            }
         </Stack>

    </Box>);
}
 
export default OrderSummary;