import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { fetchSichu } from "../../actions/action";
import Profile from "../../component/user/profile";
import TokenExpired from "../../component/user/token_expire";
import Address from "../../component/user/address";
import { Box, Stack, Typography } from "@mui/material";


export const metadata = {
    title:"My account",
    description:""
};
export default async function Page (){
  const session = await getServerSession(authOptions)
  const {accessToken} = session.user;
  let user;
    try {
         user =await fetchSichu({accessToken,endPoint:"account/user"})
       
    } catch (error) {
        console.error(error);
    }
    
    if(!user){
        return <TokenExpired/>
    }
    return ( 
        <Box className='p-4 min-h-[50vh]'>
    <Typography variant="h6" pl={1}>My account</Typography> 
    <Stack direction={{xs:'column',md:'row'}} gap={2}>
    <Profile user={user.user} />
     <Address user={user.user}/>
    </Stack>
    </Box>
    )
  }