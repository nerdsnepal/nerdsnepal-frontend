import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AddToCart = ({onClick}) => {
    const [isLoading,setLoading] = useState(false)
    const items = useSelector((state)=>state.cart.items)
    useEffect(()=>{
        setLoading(false)
    },[items])
    const handleClick= ()=>{
        setLoading(true)
       setTimeout(()=>{
        if(onClick)onClick()
       },2000)
    }
    return (<>
    <Button variant="contained" 
    disabled={isLoading}
    className="bg-blue-500 w-[185.029px] text-white font-semibold rounded-none"
     onClick={handleClick}>{isLoading?'Added':'Add to cart'}</Button>
    </>);
}
 
export default AddToCart;