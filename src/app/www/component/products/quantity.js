import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector } from "react-redux";
const Quantity = ({onChange}) => {
    const [quantity,setQuantity]= useState(1)
    const items = useSelector((state)=>state.cart.items)
    useEffect(()=>{
       setQuantity(1)
    },[items])
    const increment = ()=>{
        setQuantity((value)=>++value);
        if(onChange)onChange(quantity)
    }
    const decrement = ()=>{
        if(quantity>1){
            setQuantity((value)=>--value);
        }
        if(onChange)onChange(quantity)
    }
    return (<Box className='w-fit'>
        <Typography variant="body1" padding={1}>Quantity:</Typography>
        <Box className="border-[1px]" >
        <Stack direction={'row'} padding={1} justifyContent={'space-between'} gap={4} alignItems={'center'}>
        <RemoveIcon onClick={decrement} className="cursor-pointer" />
        <Typography>{quantity}</Typography>
        <AddIcon  onClick={increment} className="cursor-pointer hover:text-gray"/>
        </Stack>
        </Box>
    </Box>);
}
 
export default Quantity;