import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export const ShippingDetails = ({user}) => {
    const [shippingDetails,setShippingDetails] = useState({
        deliver_to:user.fullName,
        contact_details:"9811111",
        delivery_address:"Munal Chowk Area, Bharatpur, Bagmati Province, Way to Durga Mandir",
        bill_address:"",
        email:user.email,
    })
  
    return (
        <Box role="presentation"  className="border w-full rounded-md " padding={2} >
            <Typography variant="h6" marginTop={2} fontWeight={'bold'} marginBottom={2}>Shipping Details Summary</Typography>
            <Typography variant="body1">Deliver to: {shippingDetails.deliver_to} </Typography>
            <Typography variant="body1">Contact Details: {shippingDetails.contact_details}</Typography>
            <Typography variant="body1">Delivery Address: {shippingDetails.delivery_address}</Typography>
            <Typography variant="body1">Bill to the same address {}</Typography>
            <Typography>Email: {shippingDetails.email}</Typography>
        </Box>
       
    );
};
