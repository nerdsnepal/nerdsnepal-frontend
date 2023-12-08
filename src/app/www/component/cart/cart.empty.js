import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

const EmptyCart = () => {
    return (<Stack direction={'column'} gap={2} role="presentation" alignItems={'center'} justifyContent={'center'} className="w-full h-[90vh]">
        <Typography role="contentinfo" variant="body1">
        Your cart is empty
        </Typography>
        <Link href={'/shop-all'} className="bg-blue-500 p-2 text-white w-fit" size="medium"  variant="contained" type="button" role="button">START SHOPPING</Link>
    </Stack>);
}
 
export default EmptyCart;