'use client'

import Link from "next/link"
import getIcon from "../getIcon";
import React, {  Suspense, useEffect, useState,lazy } from "react";
const feather = require('feather-icons')
import { redirect, usePathname } from "next/navigation";
import { removeQueryPart } from "@/app/lib/utils/utils";
import StoreIcon from '@mui/icons-material/Store';
import { Backdrop, Box, Button, Stack } from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "next-auth/react";
const  Navbar = ()=>{
    let path = usePathname()
    const dispatch = useDispatch()
    const isSuperUser = useSelector((state)=>state.auth.isSuperAdmin)
    // Options for feather icons 
    const options = {width:22,height:22,"stroke-width":3.5}
    const navs = [
        {
             key:"navHome1",
             name:"Home",icon:getIcon(feather.icons.home,options),url:'/',
             isOpen:false,
             subNavs:[]
        },
      !isSuperUser?  {
         key:"navProducts2",
         name:"Products",icon:getIcon(feather.icons.tag,options),url:'/products?selectedView=all&role=merchant',
         isOpen:true,
         subNavs:[
            { 
             key:"navProduct2Child1",
             name:"Inventory",icon:getIcon(feather.icons.layers,options),url:'/inventory'
             },
             { 
                key:"navProduct2Child2",
                name:"Category",icon:<CategoryIcon/>,url:'/category'
                },
                { 
                    key:"navProduct2Child3",
                    name:"Series",icon:<></>,url:'/series'
                }
         ]
         }:{ 
            key:"navProduct2Child2",
            name:"Category",icon:<CategoryIcon/>,url:'/category',
            subNavs:[]
            },
         {
             key:"navOrder3",
             name:"Orders",icon:getIcon(feather.icons.truck,options),url:'/orders',
             isOpen:false,
             subNavs:[]
         },
         {
             key:"navCustomers3",
             name:"Customers",icon:getIcon(feather.icons.users,options),url:'/customers',
             isOpen:false,
             subNavs:[]
         },
         {
            key:"navStore4",
            name:"Store",icon:<StoreIcon/>,url:'/store',
            isOpen:false,
            subNavs:[]
        },
 
         {
             key:"navAnalytics4",
             name:"Analytics",icon:getIcon(feather.icons["bar-chart-2"],options),url:'/analytics',
             isOpen:false,
             subNavs:[]
         },
         {
             key:"navSetting5",
             name:"Settings",icon:getIcon(feather.icons.settings,options),url:'/settings',
             isOpen:false,
             subNavs:[]
         },
 
     ]
    
    const [currentNavs,setCurrentNavs] = useState([]);
    const [nav,setNav] =useState(false)

    const handleNav = ()=>{
        setNav(!nav)
    }
   
    //Indicator for the currently selected nav menu 
    const style = `font-bold text-blue-900 dark:text-white dark:bg-neutral-700 
   before:inline-block before:content[''] mobile:before:w-2 before:bg-red-400 before:h-6 
   before:absolute before:left-0  before:rounded-r-md
    `
    //Icons for menu and close button
    const menuIcon = getIcon(feather.icons.menu,options)
    const closeIcon = getIcon(feather.icons.x,options)

    useEffect(()=>{
        setNav(false)
        const genNavs=  navs.map(({key,name,icon,url,subNavs,isOpen})=>{
            let originalUrl = url 
            url = removeQueryPart(url)
            const genSubNavs = subNavs.map(({key,name,icon,url}) => {
                url = removeQueryPart(url);
               return <li key={key}  className={`${path===url.toString()?style:'bg-transparent'}  w-fit dark:hover:bg-neutral-900 p-2 hover:bg-neutral-200 hover:cursor-pointer `}>
                <Link  href={url.toString()} className="p-2 h-8 w-full">{icon}{name}</Link></li>
        });
            return <div key={key} className="w-48" ><li className={`${path===url.toString()?style:'bg-transparent'}  w-auto dark:hover:bg-neutral-900 p-2 hover:bg-neutral-200 hover:cursor-pointer`}>
                    <Link  href={originalUrl.toString()} className="p-2 w-full">{icon}{name}</Link>
                </li>  { subNavs.length>0? <ul className={`${isOpen?'visible':'hidden'} list-none p-4 py-4 space-y-6`}>{genSubNavs}</ul>:<></>
                    }
                </div>
        })
        setCurrentNavs(genNavs)
    },[path])

    const logout = ()=>{
        signOut().then((res)=>{
            if(res){
                dispatch(logout())
                redirect('/login')
            }
        }).catch((error)=>{})
    }

    const bottomNav = <Box  className="absolute h-[27vh] overflow-auto w-full bottom-0 border-t-[0.5px] border-gray-500">
        <Stack direction={"column"} gap={1}>
        <Button onClick={logout} startIcon={<LogoutIcon/>} className="capitalize"> Logout</Button>
        </Stack>
    </Box>

    return <>
    {/* Except Mobile View */}
    <Suspense fallback={<h1>Loading...</h1>}>
    <nav className="z-[9999] hidden mobile:flex relative flex-col border-r dark:text-white h-screen w-fit select-none">
        <ul  className="list-none h-[73vh] overflow-auto px-2 py-4 w-full space-y-2">
        {currentNavs}
        </ul>
        {bottomNav}
    </nav>
    </Suspense>

    {/* Mobile Button */}
    <span onClick={handleNav} className="block z-[999] cursor-pointer top-[-40px] mobile:hidden absolute right-4  hover:text-gray-300">{nav?closeIcon:menuIcon}</span>
    
    {/* For mobile navbar */}
    <div className={
        nav?"block mobile:hidden z-[99999] absolute my-3 backdrop-blur-md right-0 w-full border-l h-screen duration-500 transition-all ease-in":
        "block mobile:hidden absolute backdrop-blur-3xl  h-screen right-[-1000px] duration-500 transition-all ease-in"
    } style={{top:"-10px"}}>
    <nav className={'mobile:hidden flex flex-row dark:text-white h-screen select-none justify-start'}>
        <ul  className="list-none h-[73vh] overflow-auto px-2 py-4 space-y-2">
        {currentNavs}
        </ul>
        {bottomNav}
    </nav>
    </div>
    </>
   
   
}

export default Navbar