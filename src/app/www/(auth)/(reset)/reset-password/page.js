import { Box, Typography } from "@mui/material";
import VerifyCodeAndChangePassword from "./change-password";

export const metadata = {
    title:process.env.NEXT_PUBLIC_APP_NAME+'- change password',
    description:'Change password'
}

const Page = () => {
    return (<VerifyCodeAndChangePassword/>);
}
 
export default Page;