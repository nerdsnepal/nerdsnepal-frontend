'use client';
import  Box  from "@mui/material/Box";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AccountNavbar = (props) => {
    const path = usePathname();
    const links = [
        {
            url:'/account',
            label:'Manage My Account',
            subLinks:[
                {url:'/account/profile',label:'My Profile'},
                {url:'/account/address',label:'Address'}
            ]
        },
        {
            url:'/account/orders',
            label:'My Orders',
            subLinks:[
                // {url:'/account/orders/returns',label:'My Returns'},
                // {url:'/account/orders/cancellations',label:'My Cancellations'}
            ]
        }
    ];

    return (<Box className="p-4">
        {
            links.map(({url,label,subLinks},index)=>{
                const childLinks = subLinks.map(({url,label},index)=>{
                    return <Box  key={index}><Link className={path!==url?"text-black":"text-blue-500"}  href={url}>{label}</Link></Box>
                }); 
                return <div key={index}>
                    <Link className={path!==url?"font-bold text-black":" font-bold text-blue-500"}  href={url}>{label}</Link>
                    <Box marginLeft={'15px'}>
                    {childLinks}
                    </Box>
                </div>
            })
        }
    
    </Box> );
}
 
export default AccountNavbar;