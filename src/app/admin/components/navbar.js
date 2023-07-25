'use client'

import Link from "next/link"
import getIcon from "../getIcon";
import React, {  Suspense, useEffect, useState,lazy } from "react";
const feather = require('feather-icons')
import { usePathname } from "next/navigation";
import Loading from "@/app/loading";

const  Navbar = ()=>{
    const options = {width:18,height:18,"stroke-width":3}
    let path = usePathname()
    const navs = [
       {
            key:"navHome1",
            name:"Home",icon:getIcon(feather.icons.home,options),url:'/',
            isOpen:false,
            subNavs:[]
       },
       {
        key:"navProducts2",
        name:"Products",icon:getIcon(feather.icons.tag,options),url:'/products?selectedView=all',
        isOpen:false,
        subNavs:[
           { 
            key:"navProduct2Child1",
            name:"Inventory",icon:getIcon(feather.icons.layers,options),url:'/inventory'
            }
        ]
        },
        {
            key:"navOrder3",
            name:"Orders",icon:getIcon(feather.icons.truck,options),url:'/orders',
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
    const style = `font-bold text-blue-900 dark:text-white dark:bg-neutral-700 
   before:inline-block before:content[''] before:w-2 before:bg-red-400 before:h-6 
   before:absolute before:left-0  before:rounded-r-md
    `
    useEffect(()=>{
        const genNavs=  navs.map(({key,name,icon,url,subNavs,isOpen})=>{
            const genSubNavs = subNavs.map(({key,name,icon,url}) => (
                <li key={key}  className={`${path===url.toString()?style:'bg-transparent'} dark:hover:bg-neutral-900 p-2 hover:bg-neutral-200 hover:cursor-pointer w-48`}>
                <Link  href={url.toString()}>{icon}{name}</Link></li>
            ));
            return <div key={key} ><li className={`${path===url.toString()?style:'bg-transparent'} dark:hover:bg-neutral-900 p-2 hover:bg-neutral-200 hover:cursor-pointer w-48`}>
                    <Link  href={url.toString()}>{icon}{name}</Link>
                </li>  { subNavs.length>0? <ul className={`${isOpen?'visible':'hidden'} list-none p-4 py-4 space-y-6`}>{genSubNavs}</ul>:<></>
                    }
                </div>
        

        })
        setCurrentNavs(genNavs)
    },[path])
    return <>
    <Suspense fallback={<Loading/>}>
    <nav className="flex flex-row border-r dark:text-white h-screen w-fit select-none">
        <ul  className="list-none px-2 py-4 space-y-2">
        {currentNavs}
        </ul>
    </nav>
    </Suspense>
    </>
   
   
}

export default Navbar