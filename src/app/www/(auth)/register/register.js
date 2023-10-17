'use client'

import {  passwordStrengthChecker, validateUserName } from "@/app/lib/utils/utils";
import {   Alert, Button, Checkbox, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { createUser } from "../../actions/user";
import { PasswordField } from "../../component/password-field";
import Image from "next/image";


const Register = () => {
    const [user,setUser] = useState(null)
    const [creating,setCreating] = useState(false)
    const [response,setResponse] = useState({
        hasResponse:false,
        msg:"",
        severity:"info"
    })
 
    const onChange = (e)=>{
        setUser((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
        })
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        if(!validateUserName(user?.username)){
            setResponse({hasResponse:true,msg:"Invalid username",severity:"error"})
            return;
        }
        if(user?.password !== user?.confirmPassword){
            setResponse({hasResponse:true,msg:"Password not matched",severity:"error"})
            return;
        }
        if(passwordStrengthChecker(user.password)<2){
            setResponse({hasResponse:true,msg:"Please enter a strong password",severity:"error"})
            return;
        }
        setResponse({hasResponse:false,msg:""})
        setCreating(true)
        createUser(user).then((res)=>{
            if(!res.success){
                let error = ""
                for (let index = 0; index < res.error.length; index++) {
                    error += res.error[index]+"\n";
                }
                setResponse({
                    hasResponse:true,
                    msg:error,
                    severity:"error"
                })
            }else{
                //redirect('/verify-code',RedirectType.push)
                setResponse({
                    hasResponse:true,
                    msg:res.message,
                    severity:"success"
                })
            }
            setCreating(false)
        }).catch((err)=>{
        setResponse({
                hasResponse:true,
                msg:"Oops. Something went wrong!",
                severity:"error"
        })
        setCreating(false)
        })
    }
    return (<Stack direction={'row'} gap={2}>
        <Image src={'/naruto-register.png'} className="h-[493px] object-cover  w-fit mobile:block hidden select-none" alt="naruto-register" height={380} width={380} />
        <div className="dark:bg-white  dark:text-black tablet_md:w-[70vw] md_laptop:w-[50vw] above_laptop:w-[30vw] w-full p-3 space-y-2 rounded-xl transition-all">
        <Typography variant="h5">Register</Typography>
        <Typography variant="body1" color={"gray"}>Create your account</Typography>
        <form className="space-y-3" onSubmit={onSubmit}>
            <TextField id="name" value={user?.fullname||""} onChange={onChange} variant="outlined"  name="fullname" type="text" fullWidth label="Name"  required />
            <TextField id="username" value={user?.username||""} onChange={onChange} variant="outlined" name="username" type="text" fullWidth label="Username" placeholder="Username" required />
            <TextField id="email" value={user?.email||""} onChange={onChange} variant="outlined" name="email" type="email" fullWidth label="Email" placeholder="Email" required />
            <PasswordField   value={user?.password||""} onChange={onChange} label={'Password'} placeholder={'Password'} name={'password'}/>
            <PasswordField id="confirmPswd" value={user?.confirmPassword||""}  onChange={onChange} label={'Confirm Password'} placeholder={'Confirm Password'} name={'confirmPassword'}/>
           <div>
           <Checkbox required /> <Typography variant="caption" color={'GrayText'} >I agree to the terms and conditions</Typography>
           </div>
        <Button type="submit" variant="contained" disabled={creating} className="bg-blue-500 w-full capitalize">{creating?'Creating...':'Create an account'}</Button>
        </form>
       {response.hasResponse? <Alert  severity={response.severity} color={response.severity}>
            {response.msg}
        </Alert>:null}
        <Stack direction={'row'} gap={1} justifyContent={'center'} alignItems={'center'} >
            <Typography  variant="body1">Already have account?</Typography>
            <a href="/login">Log in</a>
        </Stack>
    
    </div></Stack>);
}
 
export default Register;