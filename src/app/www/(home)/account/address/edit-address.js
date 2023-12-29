'use client'
import {  Box, Button,    Checkbox,    Snackbar, Stack, Typography } from "@mui/material";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import CountrySelect, { SelectCity, SelectState } from "@/app/www/component/country-input-field";
import {  fetchSichu, postRequestSichu } from "@/app/www/actions/action";
import Link from "next/link";
import LabelAddress from "./label-address";
const EditAddress = ({props,address,accessToken}) => {
 
    const {id,tab} = props.searchParams;
    const state = true;
    const [data,setData] = React.useState()
    const [editAddress,setEditAddress] = React.useState(address.filter((_address)=>_address._id===id)[0])

 
    const tabs=['delivery','billing'];
    React.useEffect(()=>{
        fetchSichu({endPoint:"state_with_districts.json",revalidate:300}).then((value)=>{
           setData(value)
        }).catch((error)=>{
           // console.log(error);
        });
        return ()=>{};
    },[state])
    const Form = ({name,type})=>{
        const [open, setOpen] = React.useState(false);
        let message ="";
        const [validator,setValidator] = React.useState({
            phone:true,
            name:true,
        })
        const [address,setAddress] = React.useState(editAddress[type])
        const handleChange=(e)=>{
            const { name, value } = e.target;
            if (name === 'phoneNumber') {
                const phoneNumberRegex = /^\d{10}$/; 
                setValidator({...validator,"phone":phoneNumberRegex.test(value)});
              }
              if(name==="fullName"){
                const nameRegex = /^[a-zA-Z\s.'-]+$/;
                setValidator({...validator,"name":nameRegex.test(value)});
              }
            setAddress({
                ...address,
                [name]:value
            })
        }
        const handleClose = () => {
            setOpen(false);
          };
          const handleSnackbar = (_message) => {
            message=_message;
            setOpen(true);
        };
        const handleSubmit =(e)=>{
            e.preventDefault();
            const submitAddress = {
                ...editAddress,
                [type]:address
            }
          postRequestSichu({
                accessToken,
                body:submitAddress,
                endPoint:"account/address",
                method:"PATCH"
            }).then((value)=>{
                if(value.status){
                    handleSnackbar("Updated");
                  }else{
                    handleSnackbar("Something went wrong")
                  }
            }).catch((error)=>{
                handleSnackbar(error.error)
            })
        }
        return <Box className="border rounded-md p-6">
            <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            message={message}/>
        <Typography fontWeight={'bold'}>{name}</Typography>
        <Box height={25}></Box>
        <form onSubmit={handleSubmit}>
        <Stack direction={{xs:'column', md:'row'}}  gap={2}>
            <Stack direction={'column'} gap={2}>
            <TextField required type="text" label="Full name" value={address.fullName}
             name="fullName" placeholder="Full name" autoComplete="on" onChange={handleChange}
             error={!validator.name}
             helperText={validator.name ? '' : 'Invalid full name'}
             />
            <TextField required type="text" fullWidth label="Address1" value={address.address1} name="address1"
                placeholder="Address1"
                autoComplete="on"
                onChange={handleChange}/>
           
            <SelectState  onChange={(state)=>{
                  setAddress({
                    ...address,
                    "state":state
                })
            }} data={data} state={address.state} />
            <SelectCity city={address.city} onChange={(city)=>{
               setAddress({
                ...address,
                "city":city
            })
            }} data={data} state={address.state} />
            </Stack>
            <Stack direction={'column'} gap={2}>
            <CountrySelect onChange={(value)=>{
                   setAddress({
                    ...address,
                    "country":value.label
                })
            }}   />
                <TextField
                    fullWidth
                    required
                    type="tel"
                    label="Mobile Number"
                    value={address.phoneNumber}
                    name="phoneNumber"
                    placeholder="Mobile Number"
                    autoComplete="on"
                    onChange={handleChange}
                    error={!validator.phone}
                    helperText={validator.phone ? '' : 'Invalid phone number'}
                    />
                <TextField
                    type="text"
                    fullWidth
                    label="Landmark (Optional)"
                    value={address.landmark}
                    name="landmark"
                    placeholder="Landmark (Optional)"
                    autoComplete="on"
                    onChange={handleChange}/>
                    {
                        type==="billing"?null:   <LabelAddress label={address.label} onChange={(value)=>{
                            setAddress({
                                ...address,
                                "label":value
                            })
                        }} />
                    }
         
            </Stack>
            </Stack>
            <Stack direction={'row'} gap={2} padding={2} alignItems={'center'}>
                <Typography>Is default address?</Typography>
                <Checkbox checked={editAddress.default} onChange={(value)=>{
                   setEditAddress({
                    ...editAddress,
                    default:!editAddress.default
                   }) 
                }} />
            </Stack>
        <Box height={15}></Box>
        <Stack direction={'row'} gap={2} >
        <Button type="submit"  className="border  cursor-pointer capitalize disabled:opacity-50 bg-blue-500 text-white" >Update Address</Button>
        <Button   variant="text" className="text-black"><Link className="capitalize" href={'?mode=view'}>Cancel</Link></Button>
        </Stack>
        </form>
        </Box>
    }

    const Tab = ()=>{
        return <Stack direction={'row'} gap={2}>
            {
                tabs.map((value,index)=>{
                    return <Link key={index} className={ `${tab==value?'bg-gray-500 text-white font-bold rounded-sm':'bg-white text-black'}  capitalize p-2 pl-4 pr-4`} href={`?mode=edit&id=${id}&tab=${value}`}>{value.toUpperCase()}</Link>
                })
            }
        </Stack>
    }
    return (<Stack direction={'column'} gap={2}>
          
        <Tab/>
        {
        tab=='billing' ? <Form name={'Edit Billing Address'} type={'billing'} />: <Form name={'Edit Delivery Address'} type={'delivery'} />
        }
    </Stack>);
}
 
export default EditAddress;