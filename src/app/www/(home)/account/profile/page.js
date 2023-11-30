import { Box, Typography } from "@mui/material";
import Profile from "./profile";
import TokenExpired from "@/app/www/component/user/token_expire";
import { getServerSession } from "next-auth";
import { fetchSichu } from "@/app/www/actions/action";
import { authOptions } from "@/app/admin/api/auth/[...nextauth]/route";
export const metadata={
    title:"Profile"
}
const Page = async() => {
    const session = await getServerSession(authOptions)
    const {accessToken} = session.user;
    let user;
      try {
           user =await fetchSichu({accessToken,endPoint:"account/user"})
      } catch (error) {
          console.error(error);
      }
      if(!user){
          return <h1>Something went wrong</h1>
      }
    return  (<Box className='p-4 min-h-[50vh]'>
        <Typography variant="h6" pl={1}>Profile</Typography> 
       <Profile user={user.user} />
    </Box>
    );
}
 
export default Page;