'use client'
import {  Button,  Snackbar, Stack, Typography } from "@mui/material";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CountrySelect from "@/app/www/component/country-input-field";
import { isEmpty } from "@/app/lib/utils/utils";
import {  postRequestSichu } from "@/app/www/actions/action";
import { revalidatePath } from "next/cache";



export default function AddAddress({user,accessToken})  {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const Form = ()=>{
        const [isValid,setValid] = React.useState(false)
        const [open, setOpen] = React.useState(false);
        const [message,setMessage]=React.useState("")
        const handleCloseSnackbar = (event, reason) => {  
          setOpen(false);
          handleClose();
          
        };
        const [deliveryAddress,setDeliveryAddress]=React.useState({
            country:"Nepal",
            fullName: user!==undefined?user.name:"",
            street: "",
            city: "",
            state: "",
            zipCode: "",
            phoneNumber: ""
        })
        const validator=()=>{
            if(!isEmpty(deliveryAddress.city) && !isEmpty(deliveryAddress.phoneNumber) && !isEmpty(deliveryAddress.fullName)&&
            !isEmpty(deliveryAddress.country) && !isEmpty(deliveryAddress.state)&& !isEmpty(deliveryAddress.street)){
                setValid(true);
            }else{
                setValid(false);
            }
        }
       
        const handleChange =(e)=>{
            const { name, value } = e.target;
            setDeliveryAddress(prevAddress => ({
                ...prevAddress,
                [name]: value
              }));
              validator();
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
               }else{
                setMessage("Something went wrong")
               }
               
            } catch (error) {
            }finally{
                setOpen(true);
            }
        }
    
        return <>
        <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={message}
      />
        <DialogTitle>Add Address</DialogTitle>
  
        <DialogContent>
          <DialogContentText>
            Add your delivery address
          </DialogContentText>
          <Stack direction={'row'}>
        <div>
        <Typography className="p-2">Delivery Address</Typography>
        <Stack gap={2}>
              <React.Fragment>
          <TextField required type="text" label="Full name" value={deliveryAddress.fullName} name="fullName" placeholder="Full name" autoComplete="on" onChange={handleChange}/>
          <CountrySelect onChange={handleCountryChange} />
        <TextField required type="text" label="State" value={deliveryAddress.state} name="state" placeholder="State" autoComplete="on" onChange={handleChange}/>
        <TextField required type="text" label="City" value={deliveryAddress.city} name="city" placeholder="city" autoComplete="on" onChange={handleChange}/>   
      <TextField
          required
          type="text"
          label="Street"
          value={deliveryAddress.street}
          name="street"
          placeholder="Street"
          autoComplete="on"
          onChange={handleChange}
      />
      <TextField
          required
          type="text"
          label="Zip Code"
          value={deliveryAddress.zipCode}
          name="zipCode"
          placeholder="Zip Code"
          autoComplete="on"
          onChange={handleChange}
      />
      <TextField
          required
          type="tel"
          label="Phone Number"
          value={deliveryAddress.phoneNumber}
          name="phoneNumber"
          placeholder="Phone Number"
          autoComplete="on"
          onChange={handleChange}
      />
      </React.Fragment>
      </Stack>
        
        </div>
          {/*<div>
          <Typography>Billing Address</Typography>
          <Form/>
          </div>*/}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" className="text-black">Cancel</Button>
          <Button onClick={handleSubmit} className="border  cursor-pointer disabled:opacity-50 bg-black text-white" disabled={!isValid}>Add</Button>
        </DialogActions></>
    }
    return (
      <React.Fragment>
       <Button variant="text" className="capitalize m-2" onClick={handleClickOpen}>Add New Address</Button>
        <Dialog open={open} onClose={handleClose}>
        <Form/>
        </Dialog>
      </React.Fragment>
    );
}