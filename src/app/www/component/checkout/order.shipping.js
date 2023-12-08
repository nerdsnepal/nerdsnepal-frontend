import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { LabelBox } from "../../(home)/account/address/label-address";
import { isEmpty } from "@/app/lib/utils/utils";
import Link from "next/link";

export const ShippingDetails = ({address,user}) => {
    if(!address){
        return   <Box role="presentation"  className="border w-full rounded-md " padding={2} >
                <Typography variant="h6" marginTop={2} fontWeight={'bold'} marginBottom={2}>Shipping Details Summary</Typography>
                <Link className="text-blue-500" href={`/account/address?mode=add`}>Add address</Link>
        </Box>
    }
  
   const deliveryAddress = address.delivery;
   const billingAddress = address.billing;
    return (
        <Box role="presentation"  className="border w-full rounded-md bg-slate-50" padding={2} >
            <Typography variant="h6" marginTop={2} fontWeight={'bold'} marginBottom={2}>Shipping Details Summary</Typography>
            <Typography variant="body1">Deliver to: {deliveryAddress.fullName} </Typography>
            <Typography variant="body1">Contact Details: (+977) {deliveryAddress.phoneNumber}</Typography>
           <Stack direction={'row'} gap={2} alignItems={'center'} flexWrap={'wrap'}>
           <Typography variant="body1">Delivery Address:</Typography>
           <LabelBox value={deliveryAddress.label} />
           <Typography variant="body1">{`${deliveryAddress.address1}, ${deliveryAddress.city}, ${deliveryAddress.state} ${!isEmpty(deliveryAddress.landmark)?`, ${deliveryAddress.landmark}`:""}`}</Typography>
            <Link className="text-blue-500" href={`/account/address?mode=edit&id=${address._id}&tab=delivery`}>Edit</Link>
           </Stack>
           <Stack direction={'row'} gap={2} alignItems={'center'} flexWrap={'wrap'}>
           <Typography variant="body1">Billing Address:</Typography>
           <Typography variant="body1">{`${billingAddress.address1}, ${billingAddress.city}, ${billingAddress.state} ${!isEmpty(billingAddress.landmark)?`, ${billingAddress.landmark}`:""}`}</Typography>
           <Link className="text-blue-500" href={`/account/address?mode=edit&id=${address._id}&tab=billing`}>Edit</Link>
           </Stack>
            <Typography>Email: {user.email}</Typography>
        </Box>
       
    );
};
