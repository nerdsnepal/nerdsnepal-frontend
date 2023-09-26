'use client';
import { resetPassword } from "@/app/www/actions/user";
import { Alert, Button, TextField } from "@mui/material";
import { useRef, useState } from "react";

const ResetPassword = () => {
    const ref = useRef();
    const [alert,setAlert] = useState({
        hasAlert:false,
        severity:"info",
        message:""
    })
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const email = ref.current.value; 
            let data= await resetPassword({email})
            setAlert({hasAlert:true,severity:data.success?"info":"error",message:data?.message||data?.error})
        } catch (error) {
            setAlert({hasAlert:true,severity:'error',message:'Something went wrong'})
        }
    }
    return <><form onSubmit={handleSubmit} className="w-full space-y-3">
        <TextField defaultValue={''} type="email"  inputRef={ref} label="Email" className="w-full" fullWidth={false} placeholder="Enter your email address"/> 
    <Button type="submit"  className="bg-blue-500 w-full capitalize"  variant="contained">Forgot Password</Button>
   </form>
   {alert.hasAlert?<Alert  color={alert.severity} className='w-full' onClose={()=>{setAlert({...alert,hasAlert:false})}}  variant="filled" severity={alert.severity}> 
                {alert.message}
            </Alert>:null}
   </>;
}
 
export default ResetPassword;