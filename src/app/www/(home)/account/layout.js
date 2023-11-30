import { Box, Stack } from "@mui/material";
import AccountNavbar from "./navbar";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import React from "react";

 const AccountLayout = async({children}) => {
    const session = await getServerSession(authOptions)
    if(!session){
      return notFound();
    }  
    return (<>
    <Stack direction={{xs:"column",md:'row'}} className={'dark:text-black'} gap={8} justifyContent={'space-start'} alignItems={'start'} alignContent={'start'}>
    <AccountNavbar/>
    {React.cloneElement(children, { session })}
    </Stack>
    </>);
}
 
export default AccountLayout;