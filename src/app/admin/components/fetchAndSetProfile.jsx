import { useEffect, useState } from "react";
import { Avatar, Stack } from "@mui/material"

const FetchAndSetUserProfile = ({userId}) => {
    const [user,setUser]= useState(null)
    useEffect(()=>{
        (async()=>{
            try{
                const result=await fetchUserById({_id:userId})
               // console.log(result);
            }catch(error){
               // console.log(error);
            }
        })()
    },[userId])


    return <Stack direction={"row"} gap={2}>
         <Avatar  alt="Remy Sharp" src="A"  />  
         <h2>Safal Shrestha</h2>
    </Stack>
}
 
export default FetchAndSetUserProfile;