import { Box, Button, Typography } from "@mui/material";
import { authOptions } from "@/app/admin/api/auth/[...nextauth]/route";
import { fetchSichu } from "@/app/www/actions/action";
import { getServerSession } from "next-auth";
import MyAddress from "./address";
import { cookies } from 'next/headers';
import AddAddress from './add-address'
export const metadata={
    title:"My Address"
}
const Page = async() => {
    const session = await getServerSession(authOptions)
    const {accessToken} = session.user;
    let user;
      try {
        user =await fetchSichu({accessToken,endPoint:"account/user",revalidate:5})
      } catch (error) {
        console.error(error);
      }
      if(!user){
        return <h1>Something went wrong</h1>
      }
    return (<Box className='p-4 min-h-[50vh]'>
        <Typography variant="h6" pl={1}>Address</Typography> 
        <MyAddress user={user.user}/>
      <AddAddress user={user.user} accessToken={accessToken}/>
        
    </Box>);
}
 
export default Page;