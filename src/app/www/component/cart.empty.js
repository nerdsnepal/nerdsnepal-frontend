import { Button, Stack, Typography } from "@mui/material";

const EmptyCart = () => {
    return (<Stack direction={'column'} gap={2} role="presentation" alignItems={'center'} justifyContent={'center'} className="w-full h-[90vh]">
        <Typography role="contentinfo" variant="body1">
        Your cart is empty
        </Typography>
        <Button className="bg-blue-500 w-fit" size="medium"  variant="contained" type="button" role="button">START SHOPPING</Button>
    </Stack>);
}
 
export default EmptyCart;