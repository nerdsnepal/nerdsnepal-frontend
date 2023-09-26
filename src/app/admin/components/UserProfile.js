'use client'
import { Avatar } from "@mui/material";

const UserProfile = ({profileUrl,name}) => {
    return (<div className="flex flex-row relative h-full  gap-4 items-center ">
        <span className="shrink-0"> 
        <Avatar src={profileUrl}  alt={name} className="w-12 h-12 mobile:h-15 mobile: w-15"  />
        </span>
        <h3 className="hidden overflow-ellipsis mobile:block">{name}</h3> 
    </div>);
}

 
export default UserProfile;