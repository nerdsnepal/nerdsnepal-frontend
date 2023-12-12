import { Box, Rating, Stack, Typography } from "@mui/material";
import AddToCart from "../cart/add-to-cart";
import { currency_code, getCompareAtPrice } from "@/app/lib/utils/utils";
import Quantity from "./quantity";
import { useDispatch } from "react-redux";
import { addItem } from "@/app/state/reducer/cart";

const AddToCartAndDetails = ({product}) => {
    const {compare_at,discountPer} = getCompareAtPrice({compareAt:product?.price.compare_at,mrp:product?.price.mrp});
    const rating = product.rating;
    const dispatch = useDispatch()
    const reivewCount = product.reviews.length;
    let quantity = 1;
    const onChange = (_quantity)=>{
        quantity= _quantity;
    }
    const addToCart = ()=>{
        const {name,_id,storeId,price,mediaUrls,totalQuantity,isAvailable} = product
            const item = {
                quantity:quantity,name,_id,storeId,price,mediaUrls,totalQuantity,isAvailable 
            }
        dispatch(addItem(item))
        quantity=1;
    }
    return (<Box gap={2.5} margin={{xs:1,md:0}}>
        <Typography variant="h1" fontSize={'1.5em'} className="font-bold p-1 ">{product?.name}</Typography>
      <Stack direction={'row'} gap={2} alignItems={'center'}>
      <Rating name="read-only-rating" value={rating} readOnly />
      <Typography variant="body1" >{reivewCount<=1?`${reivewCount} review`:`${reivewCount} reviews`}</Typography>
      </Stack>
        <Typography className="p-1">{currency_code+product?.price?.mrp}</Typography>
        {
            compare_at>0?
                <Stack direction={'row'} gap={2}>
                    <Typography variant="caption" className="text-slate-400" component="s">{currency_code+product?.price.compare_at}</Typography>
                    <Typography variant="caption" className="text-slate-400">{`-${discountPer}%`}</Typography>
                </Stack>
            :null
        }
        <Quantity  onChange={onChange} />
        <Box height={25}></Box>
            <AddToCart onClick={addToCart}  />

        </Box>);
}
 
export default AddToCartAndDetails;