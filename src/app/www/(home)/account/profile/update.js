"use client"
import { API_URL } from "@/app/lib/utils/utils";
import { Avatar, Box, Button, FormControl, InputLabel, MenuItem, Select, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Link from "next/link";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {  CountryCodeSelect } from "@/app/www/component/country-input-field";
import { postRequestSichu } from "@/app/www/actions/action";
const UpdateProfile = ({user,accessToken}) => {
    const [currentUser,setUser] = useState(user);
    const [open, setOpen] = useState(false);
    const handleCloseSnackbar = (event, reason) => {  
        setOpen(false);
        handleClose();
      };
      const handleClose = () => {
        setOpen(false);
      };
    const [message,setMessage]=useState("")
    const handleChange= (e)=>{
        setUser({...currentUser,[e.target.name]:e.target.value})
    }
    const Gender = ()=>{
        return <FormControl sx={{ m: 1, minWidth: 120,color:"red" }} fullWidth>
        <Select
            labelId="gender"
            id="gender"
            aria-label="Gender"
            name="gender"
            value={currentUser.gender}
            label="Gender"
            onChange={handleChange}>
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
        </Select>
        </FormControl>
    }
    const updateProfile =async()=>{
       try {
         await postRequestSichu({
            accessToken,
            body:{name:currentUser.name,dob:currentUser.dob,gender:currentUser.gender,...currentUser.phone},
            endPoint:"account/user",
            method:"PATCH"
        })
        setMessage("Updated")
       } catch (error) {
        setMessage(error.message)
       }finally{
        setOpen(true);
       }
    }

    return (<>
 <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={message}
      />
    <Box className='border border-slate-300 bg-gray-50 rounded-md p-4 mobile:m-1 m-0 w-full mobile:w-[40vw] space-y-4' >
        <Avatar src={API_URL(user.profile)} />
      <Stack direction={{xs:'column',md:'row'}} gap={4}>
        <div className="w-[100%] mobile:w-[50%]">
            <TextField value={currentUser.name} name="name" onChange={handleChange} fullWidth label="Full Name"  />
        </div>
        <div className="w-fit">
        <TextField value={currentUser.email} fullWidth label="Email Address" disabled  />
        </div>
      </Stack>
      <Stack direction={{xs:'column',md:'row'}}  gap={4} justifyContent={'center'} alignItems={'center'}>
      <div className="w-[100%] mobile:w-[80%]">
        <Stack direction={'row'} >
        <CountryCodeSelect 
        countryCode={currentUser.phone===undefined?"977":currentUser.phone.code}
        onChange={(value)=>{
            setUser({...currentUser,phone:{...currentUser.phone,code:value.phone}})
        }} />
        <TextField  value={currentUser.phone===undefined?"":currentUser.phone.number} name="phone" onChange={(e)=>{
            setUser({...currentUser,phone:{...currentUser.phone,number:e.target.value}})
        }} fullWidth label="Mobile number"   />
        </Stack>
        </div>
        <div className="w-fit">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker 
            label="Date of birth"
            onChange={(value)=>{
                setUser({...currentUser,dob:value.$d})
            }}  format="YYYY-MM-DD" defaultValue={dayjs(currentUser.dob===undefined? new Date():currentUser.dob)} shouldDisableDate={(date)=>{
            return date>new Date()
        }} />
        </LocalizationProvider>
        </div>
      </Stack>
    <Stack direction={{xs:'column',md:'row'}}  gap={4}>
    <Gender/>
    <div className="w-[100%] mobile:w-[35%]">
        
            <TextField value={currentUser.username} fullWidth label="Username" disabled  />
        </div>
    <div className="w-fit">
            <TextField value={currentUser.role} fullWidth label="Role" disabled  />
        </div>

    </Stack>
  <Stack direction={'row'} gap={3} alignItems={'center'}>
  <Button variant="text" className="bg-blue-500 text-white" onClick={updateProfile}>Update Profile</Button>
  <Link variant="text" href={'/account/profile'} className="text-blue-500 text-center">Cancel</Link>
  </Stack>

    </Box>
    </>);
}
 
export default UpdateProfile;