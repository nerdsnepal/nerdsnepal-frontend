import { API_URL } from "@/app/lib/utils/utils";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material/index";
import UpdateProfile from "./update";
import Link from "next/link";


const Profile = ({user,props,accessToken}) => {
    const {mode} = props.searchParams;
    console.log(user);
    if(mode==='edit'){
        return <UpdateProfile user={user} accessToken={accessToken}  />
    }
    return (<Box className='border border-slate-300 bg-gray-50 rounded-md p-4 mobile:m-1 m-0 w-full mobile:w-[40vw] space-y-4' gap={1} >
        <Avatar src={API_URL(user.profile)} />
      <Stack direction={'row'} gap={4}>
        <div className="w-[50%] mobile:w-[35%]">
            <Typography variant="body1" fontWeight={'bold'}>Full Name</Typography>
            <Typography variant="body1">{user.name}</Typography>
        </div>
        <div className="w-fit">
            <Typography variant="body1" fontWeight={'bold'}>Email Address</Typography>
            <Typography variant="body1">{user.email} <b className={user.isVerified?"text-green-500":"text-red-500"}>({user.isVerified?"Verified":"Not verified"})</b></Typography>
        </div>
      </Stack>
      <Stack direction={'row'} gap={4}>
      <div className="w-[50%] mobile:w-[35%]">
            <Typography variant="body1" fontWeight={'bold'}>Phone</Typography>
            <Typography variant="body1">{user.phone===undefined?"None":user.phone}</Typography>
        </div>
        <div className="w-fit">
            <Typography variant="body1" fontWeight={'bold'}>Date of birth</Typography>
            <Typography variant="body1">{user.dob===undefined?"None":user.dob}</Typography>
        </div>
        <div className="w-fit">
            <Typography variant="body1" fontWeight={'bold'}>Gender</Typography>
            <Typography variant="body1">{user.gender}</Typography>
        </div>
      </Stack>
    <Stack direction={'row'} gap={4}>
    <div className="w-[50%] mobile:w-[35%]">
            <Typography variant="body1" fontWeight={'bold'}>Username</Typography>
            <Typography variant="body1">{user.username}</Typography>
        </div>
    <div className="w-fit">
            <Typography variant="body1" fontWeight={'bold'}>Role</Typography>
            <Typography variant="body1">{user.role}</Typography>
        </div>

    </Stack>
    <Box height={25}></Box>
    <Link variant="text" href={'?mode=edit'}  className="bg-blue-500 text-white p-2 mt-4">Edit Profile</Link>

    </Box>);
}
 
export default Profile;