import { clearCart } from "@/app/state/reducer/cart";
import { Box, Button,Typography,Stack } from "@mui/material"
import { useDispatch } from "react-redux";
import { postRequestSichu } from "../../actions/action";
import { useRouter } from "next/navigation";

const PaymentMethod = ({props,accessToken}) => {
    const {orderId} =props.searchParams;
    const router = useRouter()
    const dispatch = useDispatch()
    const handleCOD= async()=>{
        
        try {
            const body={
                method:"COD",
                orderId:orderId
            }
            const result = await  postRequestSichu({accessToken,body,endPoint:"order/payment",method:"PATCH"})  
            console.log(result);
            if(result.success){
                dispatch(clearCart())
                router.replace(`account/orders?orderId=${result.data._id}&paymentMethod=${result.data.paymentMethod}&paymentStatus=${result.data.paymentStatus}`)
            }
           } catch (error) {
            
           }
    }
    const COD=()=>{
        return <Button onClick={handleCOD} className="capitalize border-gray-300 text-black" variant="outlined">Cash on Delivery</Button>
    }
 

    return ( <Box>
        <Box height={25}></Box>
       <Typography>Choose a payment method</Typography>
       <Stack padding={1} alignItems={'center'}>
       <COD/>
       </Stack>
   </Box> );
}
 
export default PaymentMethod;