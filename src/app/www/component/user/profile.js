import { Box, Stack, Typography } from "@mui/material";

const Profile = ({user}) => {
    
    return (<Box className='border border-slate-300 bg-gray-50 rounded-md p-4 mobile:m-1 m-0 w-screen mobile:w-fit'>
        <Stack direction={"row"} gap={2} >
        <Typography variant="h6" fontWeight={'bold'}>My Profile</Typography>
        {/*<Typography>Edit</Typography>*/}
        </Stack>
        <Typography>{user.name}</Typography>
        <Typography>{user.email}</Typography>
        <Typography fontWeight={'bold'} color={'blue'}>{user.role}</Typography>
    </Box>);
}
 
export default Profile;