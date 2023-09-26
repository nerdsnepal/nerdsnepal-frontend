import { Box, Button, TextField, Typography } from "@mui/material";
import ResetPassword from "./reset";

export const metadata = {
    title:process.env.NEXT_PUBLIC_APP_NAME+ '-Reset',
    description:'Sichu-Reset Page. Forgot Password? We&apos;ll send you an email with a link to reset your password.',
    keywords:'Sichu,Reset Password'
}

const ResetPage = () => {
    
    return (<div className="flex h-screen justify-center items-center">
    <Box className="dark:bg-white dark:text-black w-[100vw] rounded-sm mobile:w-[30vw] space-y-3 p-3" >
        <Typography variant="h4">Forgot Password</Typography>
        <Typography variant="body1" color={'GrayText'}>Oops! Did you forgot your password? I&apos;ll send you an email with a link to reset your password.</Typography>
       <ResetPassword/>
    </Box>

    </div>);
}
 
export default ResetPage;