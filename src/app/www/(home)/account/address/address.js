"use client"
import { CountryCode } from "@/app/www/component/country-input-field";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import * as React from 'react';

const MyAddress = ({user}) => {
    const [address,setAddress] = React.useState(user.address)
    
    const RenderAddress = ()=>{
       const BillingAddress  = ({billingAddress})=>{
        return <>
            <Typography>{billingAddress.street},{billingAddress.city},{billingAddress.state},{billingAddress.country}</Typography>
        </>
       }
       const DeliveryAddress = ({deliveryAddress})=>{
        return <>
            <Typography>{deliveryAddress.street},{deliveryAddress.city},{deliveryAddress.state},{deliveryAddress.country}</Typography>
        </>
       }
       const SameAddress = ({address})=>{
        return <Box>
           <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
           <Typography fontWeight={'bold'}>{address.fullName}</Typography>
         <Button variant="text" className="capitalize ">Edit</Button>
           </Stack>
        <Typography fontWeight={'bold'}>+({CountryCode(address.country)}) {address.phoneNumber}</Typography>
      
        <Typography>{address.street},{address.city},{address.state},{address.country}</Typography>
        </Box>
       }
        return <Stack direction={'column'} gap={2}>
             {
                address.map((_address,index)=>{
                    const delivery = _address.delivery;
                    const billing = _address.billing;
                    if(JSON.stringify(delivery)===JSON.stringify(billing)){
                       return <SameAddress address={delivery} key={index} />
                    }
                    return <div key={index}>
                    <DeliveryAddress deliveryAddress={_address.delivery} />
                    <Divider/>
                    <BillingAddress billingAddress={_address.billing}  />
                    </div>
                })
             }
        </Stack>
    }


    return (<Box className='border border-slate-300 bg-gray-50 rounded-md p-4 mobile:m-1 m-0 w-full mobile:w-[40vw] space-y-4' >
         <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
         </Stack>
         {
            user.address===null?<Typography variant="h5">No address</Typography>:<RenderAddress/>
         }

    </Box> );
}
 
export default MyAddress;