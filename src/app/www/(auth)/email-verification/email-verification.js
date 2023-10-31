"use client";
import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";

import ExpiredTimer from "../../component/timer";
import { useState } from "react";
import { sendEmailVerificationCode, verifyEmailVerificationCode } from "../../actions/user";


const EmailVerificationForm = ({email}) => {
    const expireTimer = isNaN(localStorage.getItem('timeLeft'))||localStorage.getItem('timeLeft')===undefined?Date.now()+300000:Number(localStorage.getItem('timeLeft'))+Date.now();
    const [isTimerExpired,setTimerExpired] = useState(false);
    const [response,setHandleResponse] = useState({
        isActive:false,
        status:false,
        message:"",
    }) 
    const [verificationCode, setVerificationCode] = useState(["","","","","",""]);
  const handleResend=async()=>{
    try {
        const body = {email:email}
       const result = await sendEmailVerificationCode(body);
       if(result['isSendVerificationMail']){
            setTimerExpired(true);
       }
         setHandleResponse({
        isActive:true,
        status:result['success'],
        message:result['message']
         })  
    } catch (error) {
        setHandleResponse({
            isActive:true,
            status:result['success'],
            message:result['error']
           });
    }
  }
  const handleVerify = async()=>{
    let code = "";
    verificationCode.map((value)=>{
        code+=value;
    })
    if(code.length!==6)return;
    try {
        const body = {email:email,code:code};
      const result=  await  verifyEmailVerificationCode(body);
       setHandleResponse({
        isActive:true,
        status:result['success'],
        message:result['message']
       })
      
    } catch (error) {
        setHandleResponse({
            isActive:true,
            status:result['success'],
            message:result['message']
        })
    }

  }
  const InputField = ({index,value})=>{
  
    return <div className="w-16" ><TextField focused={true} value={value} fullWidth name={`code-${index}`}   onChange={(e) => {
        const updatedCode = [...verificationCode];
        updatedCode[index] = e.target.value;
        setVerificationCode(updatedCode);
      }} inputProps={{maxLength: 1}} sx={{textAlign:"center"}}  /></div>
  }
    return (<Box className="w-full mobile:w-1/3" padding={2}>
        <Typography role="presentation" variant="h1" fontSize={36}>Verify your email address</Typography>
        <Box  className="w-full mobile:w-[90%] space-y-2"  gap={2} >
        <Typography>Please check your inbox or spam for verification code 
            sent to <b>{email}</b>
        </Typography>
       <Stack direction={'row'} gap={1}>
         {verificationCode.map((value,index) => (
            <InputField key={index} index={index} value={value} />
          ))}
       </Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
           
            <Button variant="text" role="button"  disabled={!isTimerExpired}  onClick={handleResend}  className="text-black   capitalize">Resend</Button>
            {
                isTimerExpired?null: <ExpiredTimer isTimerFinished={()=>{
                        setTimerExpired(true)
                }}  expirationTime={expireTimer} />
            }
          
            </Stack>

        <Button  onClick={handleVerify} variant="contained" role="button" fullWidth  className="capitalize bg-blue-500" >Verify</Button>
        {
            response.isActive?<Alert  severity={response.status?"success":"error"}>
            {response.message}
            </Alert>:null
        }
    
        </Box>
       
    
        </Box>);
}
 
export default EmailVerificationForm;