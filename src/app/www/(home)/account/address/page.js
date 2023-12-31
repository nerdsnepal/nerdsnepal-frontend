import { Box, Typography } from "@mui/material/index";
import { authOptions } from "@/app/admin/api/auth/[...nextauth]/route";
import { fetchSichu } from "@/app/www/actions/action";
import { getServerSession } from "next-auth";
import MyAddress from "./address";
export const metadata={
    title:"My Address"
}
const Page = async(props) => {
    const session = await getServerSession(authOptions)
    const {accessToken} = session.user;
    let user;
      try {
        user =await fetchSichu({accessToken,endPoint:"account/user",revalidate:0,})
      } catch (error) {
        console.error(error);
      }
      if(!user){
        return <h1>Something went wrong</h1>
      }
    return (<Box className='p-4 min-h-[50vh]'>
        <Typography variant="h6" pl={1}>Address</Typography> 
        <Box height={20}></Box>
        <MyAddress user={user.user} accessToken={accessToken} props={props} />
      {/*<AddAddress user={user.user} accessToken={accessToken}/>
        */}
    </Box>);
}
 
export default Page;