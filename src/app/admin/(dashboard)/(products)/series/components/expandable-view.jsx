'use client'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from "react";

const ExpandableViewForUser = ({user}) => {
    const [isExpanded,setExpanded] = useState(false)
    const toggler = ()=>setExpanded(!isExpanded)
    let bg_color = "border-red-500"
    switch(user?.role){
        case "user":
            bg_color="bg-green-500"
            break;
        case "merchant":
            bg_color="bg-red-500"
            break;
        case "superuser":
            bg_color="bg-blue-500"
            break;
    }
    if(isExpanded){
        return  <div className='cursor-pointer'>
            <ExpandLessIcon onClick={toggler}/>
            <span>{user.username}</span>
            <div className='ml-5'>
            <h1 className={`${bg_color} text-xs rounded-xl px-2 py-[2px] text-white`}>{user?.role}</h1>
            {/*<h1>{user.email}</h1>*/}
            </div>
        </div>;
    }
    return <div className='inline-block cursor-pointer'>
            <ExpandMoreIcon onClick={toggler} /> <span>{user?.username}</span>
        </div>
    
}
 
export default ExpandableViewForUser;

