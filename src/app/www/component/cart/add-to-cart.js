import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AddToCart = ({onClick,totalQuantity=0}) => {
    const [isLoading,setLoading] = useState(false)
    const items = useSelector((state)=>state.cart.items)
    useEffect(()=>{
        setLoading(false)
    },[items])
    const handleClick= ()=>{
        setLoading(true)
       setTimeout(()=>{
        if(onClick)onClick()
       },1200)
    }
    return (<>
    <Button variant="contained" 
    disabled={isLoading||totalQuantity<1?true:false}
    className={`w-[185.029px]  font-semibold rounded-none ${totalQuantity<1?'text-red-400 bg-red-200 !important':'text-white bg-blue-500'}`}
     onClick={handleClick}>{isLoading?'Added':totalQuantity<1?'Out of stock':'Add to cart'}</Button>
    </>);
}
 
export default AddToCart;