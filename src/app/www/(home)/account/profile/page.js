import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Profile from "./profile";
import { getServerSession } from "next-auth";
import { fetchSichu } from "@/app/www/actions/action";
import { authOptions } from "@/app/admin/api/auth/[...nextauth]/route";
export const metadata={
    title:"Profile"
}
const Page = async(params) => {
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
       <Profile props={params} accessToken={accessToken} user={user.user} />
    </Box>
    );
}
 
export default Page;