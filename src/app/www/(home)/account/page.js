import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { fetchSichu } from "../../actions/action";
const Profile =lazy(()=>import( "../../component/user/profile"));
const TokenExpired =lazy(()=>import( "../../component/user/token_expire"));
const Address =lazy(()=>import( "../../component/user/address"));
import { Box, Stack, Typography } from "@mui/material/index";
import { Suspense,lazy } from "react";
const RecentOrder =lazy(()=>import( "../../component/orders/recent-order"));


export const metadata = {
    title:"My account",
    description:""
};
export default async function Page (){
  const session = await getServerSession(authOptions)
  const {accessToken} = session.user;
  let user;
    try {
         user =await fetchSichu({accessToken,endPoint:"account/user",revalidate:5})
       
    } catch (error) {
        console.error(error);
    }
    
    if(!user){
        return <TokenExpired/>
    }
    return ( 
   <Suspense fallback={<></>}>
     <Box className='p-4 min-h-[50vh] space-y-2' >
    <Typography variant="h6" pl={1}>My account</Typography> 
    <Stack direction={{xs:'column',md:'row'}} gap={2}>
    <Profile user={user.user} />
     <Address user={user.user}/>
    </Stack>
    <RecentOrder accessToken={accessToken} />
    </Box>
   </Suspense>
    )
  }