import { Box, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
export const metadata = {
    title:"404 Page not found",
    description:"404 Page not found"
}

const Notfound = () => {
    return (<Fragment>
        <Box className="h-screen dark:text-black w-full bg-white flex" justifyContent={'center'} alignItems={'center'}>
        <Stack gap={2}>
        <Typography variant="h1">Page not found</Typography>
        <a href={'/'}>Return Home</a>
        </Stack>
        </Box>
    </Fragment>);
}
 
export default Notfound;