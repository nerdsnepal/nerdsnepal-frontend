'use client'
import {  Box, Button,    Snackbar, Stack, Typography } from "@mui/material";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import CountrySelect, { SelectCity, SelectState } from "@/app/www/component/country-input-field";
import {  fetchSichu, postRequestSichu } from "@/app/www/actions/action";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import LabelAddress from "./label-address";
export default function AddAddress({user,accessToken})  {
    const [data,setData] = React.useState()
    React.useEffect(()=>{
        fetchSichu({endPoint:"state_with_districts.json",revalidate:300}).then((value)=>{
           setData(value)
        }).catch((error)=>{
            console.log(error);
        });
        return ()=>{};
    },[])

    const Form = ()=>{
        const [open, setOpen] = React.useState(false);
        const [message,setMessage]=React.useState("");
        const [validator,setValidator] = React.useState({
            phone:true,
            name:true,
        })
        const handleClose = () => {
            setOpen(false);
          };
        const handleCloseSnackbar = (event, reason) => {  
          setOpen(false);
          handleClose();
        };
        const [deliveryAddress,setDeliveryAddress]=React.useState({
            country:"Nepal",
            fullName: user!==undefined?user.name:"",
            address1: "",
            landmark:"",
            city: "Kathmandu",
            state: "Bagmati",
            phoneNumber: "",
            label:"Home"
        }) 
        const handleChange =(e)=>{
            const { name, value } = e.target;
            if (name === 'phoneNumber') {
                const phoneNumberRegex = /^\d{10}$/; 
                setValidator({...validator,"phone":phoneNumberRegex.test(value)});
              }
              if(name==="fullName"){
                const nameRegex = /^[a-zA-Z\s.'-]+$/;
                setValidator({...validator,"name":nameRegex.test(value)});
              }
            setDeliveryAddress(prevAddress => ({
                ...prevAddress,
                [name]: value
              }));
        }
        const handleCountryChange = React.useCallback((value) => {
            if (value === null) {
              setDeliveryAddress(prevAddress => ({
                ...prevAddress,
                country: ""
              }));
            } else {
              setDeliveryAddress(prevAddress => ({
                ...prevAddress,
                country: value.label
              }));
            }
          }, [setDeliveryAddress]);

          const handleSubmit = async(e)=>{
            e.preventDefault();
            try {
               const response= await  postRequestSichu({accessToken:accessToken,endPoint:"account/address",body:deliveryAddress,method:"POST"});
               if(response.status){
                 setMessage("Added")
                 revalidatePath("account/address")
               }
            } catch (error) {
                setMessage("Something went wrong")
            }finally{
                setOpen(true);
            }
        }
        return <Box className="border rounded-md p-6">
            <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
            message={message}
        />
            <Typography fontWeight={'bold'}>Add New Address</Typography>
            <Box height={25}></Box>
            <form onSubmit={handleSubmit}>
            <Stack direction={{xs:'column', md:'row'}}  gap={2}>
                <Stack direction={'column'} gap={2}>
                <TextField required type="text" label="Full name" value={deliveryAddress.fullName}
                name="fullName" placeholder="Full name" autoComplete="on" onChange={handleChange}
                error={!validator.name}
                helperText={validator.name ? '' : 'Invalid full name'}
                />
                <TextField required type="text" fullWidth label="Address1" value={deliveryAddress.address1} name="address1"
                    placeholder="Address1"
                    autoComplete="on"
                    onChange={handleChange}/>
            
                <SelectState  onChange={(state)=>{
                    setDeliveryAddress({...deliveryAddress,state:state})
                }} data={data} state={deliveryAddress.state} />
                <SelectCity city={deliveryAddress.city} onChange={(city)=>{
                    setDeliveryAddress({...deliveryAddress,city:city})
                }} data={data} state={deliveryAddress.state} />
                </Stack>
                <Stack direction={'column'} gap={2}>
                <CountrySelect  onChange={handleCountryChange}  />
                    <TextField
                        fullWidth
                        required
                        type="tel"
                        label="Mobile Number"
                        value={deliveryAddress.phoneNumber}
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
                        value={deliveryAddress.landmark}
                        name="landmark"
                        placeholder="Landmark (Optional)"
                        autoComplete="on"
                        onChange={handleChange}/>
                <LabelAddress label={deliveryAddress.label} onChange={(value)=>{
                    setDeliveryAddress({...deliveryAddress,label:value})
                }} />
                </Stack>
        
            </Stack>
            <Box height={15}></Box>
            <Stack direction={'row'} gap={2} >
            <Button type="submit"  className="border  cursor-pointer capitalize disabled:opacity-50 bg-blue-500 text-white" >Add New Address</Button>
            <Button onClick={handleClose}  variant="text" className="text-black"><Link className="capitalize" href={'?mode=view'}>Cancel</Link></Button>
            </Stack>
            </form>
                </Box>
    }
    return (
      <React.Fragment>
        <Form/>
      </React.Fragment>
    );
}