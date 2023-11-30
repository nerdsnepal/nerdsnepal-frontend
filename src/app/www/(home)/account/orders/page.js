import { Box, Typography } from "@mui/material";
export const metadata={
    title:"Orders"
}
const Page = () => {
    return (<Box className='p-4 min-h-[50vh]'>
        <Typography variant="h6" pl={1}>My orders</Typography> 
    </Box>);
}
 
export default Page;