"use client"
import { CountryCode } from "@/app/www/component/country-input-field";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import * as React from 'react';
import AddAddress from "./add-address";
import Link from "next/link";
import { equalAddress } from "@/app/lib/utils/utils";
import EditAddress from "./edit-address";
import { postRequestSichu } from "@/app/www/actions/action";
import { LabelBox } from "./label-address";
import { RenderAddress } from "@/app/www/component/user/address";

const MyAddress = ({user,props,accessToken}) => {
    const [address,setAddress] = React.useState(user.address)
    const {mode} = props.searchParams
    if(mode==='edit'){
        return <EditAddress address={address} accessToken={accessToken} props={props} />
    }else if(mode ==='add'){
        return <AddAddress  accessToken={accessToken} user={user} />
    }
    const remove=(id)=>{
        const newAddress = address.filter((_address)=>_address._id!==id)
        setAddress(newAddress)
    }
    const handleDelete =(id)=>{
       
        postRequestSichu({
            accessToken,
            body:{_id:id},
            endPoint:"account/address",
            method:"DELETE"
        }).then((value)=>{
            console.log(value);
            if(value.status){
                remove(id)
            }
        }).catch((error)=>{})

    
    }
    
    const AddressRender = ()=>{
       const DefaultBox = ({value})=>{
        return <Box className="bg-gray-200 w-fit p-2 rounded-md">
             <Typography>{value}</Typography>
        </Box>
       }
       
       const SameAddress = ({address,id,isDefault})=>{
        return <Box className='border border-slate-300 bg-gray-50 rounded-md p-4 mobile:m-1 m-0 w-full mobile:w-[40vw] space-y-2'>
           <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
           <Typography fontWeight={'bold'}>{address.fullName}</Typography>
            <Stack direction={'row'} gap={2}>
            <Button variant="text" className="capitalize"><Link href={`?mode=edit&id=${id}`}>Edit</Link></Button>
            <Button onClick={()=>handleDelete(id)} variant="text" className="capitalize text-red-800">Delete</Button>
            </Stack>
           </Stack>
        <Typography fontWeight={'bold'}>+({CountryCode(address.country)}) {address.phoneNumber}</Typography>
        <Typography>{address.address1},{address.state},{address.city},{address.country}</Typography>
        <Stack direction={'row'} gap={2}>
            <LabelBox value={address.label} />
           {
            isDefault?<> <DefaultBox value={'Default Delivery Address'}  />
            <DefaultBox value={'Default Billing Address'}  /></>:null
           }
        </Stack>
        </Box>
       }
        return <Stack direction={'column'}  gap={1}>
             {
                address.map((_address,index)=>{
                    const delivery = _address.delivery;
                    const billing = _address.billing;
                    if(equalAddress(delivery,billing)){
                       return <SameAddress isDefault={_address.default} id={_address._id} address={delivery} key={index} />
                    }
                    return <Box key={index} className='border border-slate-300 bg-gray-50 rounded-md p-4 mobile:m-1 m-0 w-full mobile:w-[40vw]  space-y-2'>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography fontWeight={'bold'}>{address.fullName}</Typography>
                        <Stack direction={'row'} gap={2}>
                        <Button variant="text" className="capitalize"><Link href={`?mode=edit&id=${_address._id}`}>Edit</Link></Button>
                        <Button onClick={()=>handleDelete(_address._id)} variant="text" className="capitalize text-red-800">Delete</Button>
                        </Stack>
                        </Stack>
                       <Stack  direction={'row'}>
                         <RenderAddress address={delivery} type={`${_address.default?'Default':''} Delivery Address`} />
                         <RenderAddress address={billing} type={`${_address.default?'Default':''} Billing Address`} />
                    </Stack>
                    </Box>
                })
             }
        </Stack>
    }


    return (<Box  >
         <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
         </Stack>
         {
            user.address===null?<Typography variant="h5">No address</Typography>:<AddressRender/>
         }
        <Link href={'?mode=add'}>Add new address</Link>
    </Box> );
}
 
export default MyAddress;