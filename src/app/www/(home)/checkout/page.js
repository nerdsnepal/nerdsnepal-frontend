import { Box, Button } from "@mui/material";
import CheckoutPage from "./checkout";
import { authOptions } from "@/app/admin/api/auth/[...nextauth]/route";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { fetchSichu } from "../../actions/action";
export const metadata= {
    title:"Checkout",
}
const Auth = ()=>{
    return <Box>
        <Button><Link href={'/register'}>Register</Link></Button>
        <Button><Link href={'/login'}>Login</Link></Button>
    </Box>
}
const Page =async (props) => {
    const session = await getServerSession(authOptions)
    if(!session){
        return <Box className="min-h-[60vh]">
            <Auth/>
            <CheckoutPage/>
        </Box>
    }
    const {accessToken} = session.user;
    let user;
      try {
           user =await fetchSichu({accessToken,endPoint:"account/user"})
      } catch (error) {
        //console.log(error);
      }
     

    if(!user){
        return <Auth/>
      }
    return (
       <CheckoutPage accessToken={accessToken} user={user.user} props={props}/>
    );
}
 
export default Page;