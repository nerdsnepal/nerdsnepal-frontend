"use client"
import { passwordStrengthChecker } from "@/app/lib/utils/utils";
import { changeForgotPassword, verifyResetToken } from "@/app/www/actions/user";
import { PasswordField } from "@/app/www/component/password-field";
import { Alert, Box, Button, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
const useQueryParams = ()=>{
    const [params,setParams] = useState([])
    const [isLoading,setLoading] = useState(true)
    const searchParams = useSearchParams()
    useEffect(()=>{
        let  currentParams = []
        for(let key of searchParams.keys()){
            currentParams.push({[key]:searchParams.get(key)})
        }
        setParams(currentParams)
        setLoading(false)
       },[searchParams])
     return {isLoading,params}
}

const getByKey = (arr,key) => (arr.find(x => Object.keys(x)[0] === key) || {})[key]

const VerifyCodeAndChangePassword = () => {
    const [password,setPassword] = useState(null)
    const _params = useQueryParams()
    let token = useRef(null)
    const [isVerifying,setVerifying] = useState(true) 
    const [isExpire,setExpire] = useState(false)
    const [resetToken,setResetToken] = useState(null)
    const [alert,setAlert] = useState({
        hasAlert:false,
        message:"",
        severity:"info"
    })
  useEffect(()=>{
    const {isLoading,params} = _params 
    if(!isLoading && token.current===null) {
      token.current = getByKey(params,'token');
      verifyResetToken({token:token.current}).then(({isExpire,resetToken})=>{
        setExpire(isExpire)
        setResetToken(resetToken)
      }).catch((err)=>{
        setExpire(true) 
      }).finally(()=>{
        setVerifying(false)
      })
    }
   
  },[_params])
       

       const validate = ()=>{
        if(password?.password!==password?.confirmPassword){
            setAlert({hasAlert:true,message:"Password not matched",severity:"error"})
            return false 
        }
        if(passwordStrengthChecker(password.password)<1){
            setAlert({hasAlert:true,message:"Please, enter a strong password",severity:"error"})
            return false 
        }
        setAlert({...alert,hasAlert:false})
        return true  
       }
       const onSubmit = (e)=>{
        e.preventDefault()
        if(validate()){
            const body = {
                ...password,
                passwordResetToken:resetToken
            }
           changeForgotPassword(body).then((res)=>{
                if(res.success){
                    setAlert({hasAlert:true,message:res.message,severity:"success"})
                }else{
                    setAlert({hasAlert:false,message:res.error,severity:"error"})
                }
           }).catch((error)=>{
            setAlert({hasAlert:false,message:"Something went wrong",severity:"error"})
           }).finally(()=>{
            setPassword(null)
           })
                
        }
       }
       const handleOnChange= (e)=>{
            setPassword({...password,[e.target.name]:e.target.value})
       }
       if(isVerifying){
        return <h1>Verifying token.....</h1>
       }
       if(!isVerifying&& isExpire){
        return <h1>Token Expired</h1>
       }
    return (<div className="flex h-screen justify-center items-center">
    <Box className="dark:bg-white dark:text-black w-[100vw] rounded-sm mobile:w-[30vw] space-y-3 p-3" >
       <Typography variant="h4">Reset Password</Typography>
        <Typography variant="body1" color={'GrayText'}>Chopper to the rescue! I will help you to reset your password with a new one.</Typography>
        <form className="space-y-3" onSubmit={onSubmit}>
            <PasswordField onChange={handleOnChange} value={password?.password||""} id="reset-password" name={'password'} label={'Password'} placeholder={'Enter your new password'} />
            <PasswordField onChange={handleOnChange} value={password?.confirmPassword||""} id="reset-confirmPassword" name='confirmPassword' label={'Confirm Password'} placeholder={'Confirm Password'} />
            <Button variant="contained" type="submit" className="bg-blue-500 capitalize w-full">Reset Password</Button>
        </form>
     {
        alert.hasAlert?  
         <Alert severity={alert.severity} color={alert.severity} >
        {alert.message}
    </Alert>:null 
     }
        </Box>
    </div>);
}
export default VerifyCodeAndChangePassword;