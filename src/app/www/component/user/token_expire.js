'use client'
import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useDispatch } from "react-redux";

const TokenExpired = () => {
    const dispatch = useDispatch();
    signOut().then(()=>{
        dispatch(logout());
        redirect('/')
    })
    return (<>
    </> );
}
 
export default TokenExpired;