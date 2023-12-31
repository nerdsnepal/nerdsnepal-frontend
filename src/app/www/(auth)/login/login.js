"use client";
import {  emailValidator } from "@/app/lib/utils/utils";
import {   Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { PasswordField } from "../../component/password-field";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = ({props}) => {
   const router = useRouter()
    const {status} = useSession()
    const [credentials,setCredentials] = useState(null)
    const [logging,setLogging] = useState(false)
    const [response,setResponse] = useState({
        hasResponse:false,
        msg:"",
        severity:"info"
    })
    const onChange = (e)=>{
        setCredentials((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
        })
    }
    const getUser = ()=>{
        let user = {}
        if(emailValidator(credentials.email_username)) user = {password:credentials.password,username:credentials.email_username,isEmail:true}
        else user = {password:credentials.password,username:credentials.email_username,isEmail:false}
        return user
    }

    const login =async (user)=>{
        try {
         let result=  await   signIn("credentials",{...user,redirect:false})
         if(result.error){
            setResponse({msg:JSON.parse(result.error).message,severity:"error",hasResponse:true})
         }else{
            const {redirectTo} = props.searchParams
            if(redirectTo){
                router.replace(`/${redirectTo}`)
            }else{
                router.replace('/')
            }
          
         }
        } catch (error) {
             console.log(error);
             setResponse({msg:"Something went wrong",severity:"error",hasResponse:true})
        }finally{
            setLogging(false)
        } 
      }
    const onSubmit = async(e)=>{
        e.preventDefault();
        setLogging(true)
        await login(getUser());
    }
    if(status==="loading")return null
    return (<Stack direction={'row'} gap={2}>
        <Image alt="deadpool-welcome-back" unoptimized  src={'/deadpool-welcome-back.png'} loading="lazy" className="h-[35vh] object-cover  w-fit mobile:block hidden select-none" height={250} width={250} />
       <div className="dark:text-black tablet_md:w-[70vw] md_laptop:w-[50vw] above_laptop:w-[30vw] w-full mobile:m-0 m-2 p-3 space-y-2 rounded-md transition-all">
       <Typography variant="h5">Welcome Back!</Typography>
        <Typography variant="body1" color={"gray"}>Login to your account</Typography>
        <form className="space-y-3" onSubmit={onSubmit}>
            <TextField id="email_username" value={credentials?.email_username||""} onChange={onChange} variant="outlined" name="email_username" type="text"  fullWidth label="Username or email" placeholder="Username or email" required />
            <PasswordField   value={credentials?.password||""} onChange={onChange} label={'Password'} placeholder={'Password'} name={'password'}/>
            <div>
                <Link href="/reset">Forgot password?</Link>
            </div>
        <Button type="submit" variant="contained" disabled={logging} className="bg-blue-500 w-full capitalize">{logging?'Logging...':'Login'}</Button>
        </form>
       {response.hasResponse? <Alert  severity={response.severity} color={response.severity}>
            {response.msg}
        </Alert>:null}
        <Stack direction={'row'} gap={1} justifyContent={'center'} alignItems={'center'} >
            <Typography  variant="body1">{`Don't have an account?`}</Typography>
            <Link href="/register">Register</Link>
        </Stack>
       </div>
       </Stack>
       );
}
 
export default Login;