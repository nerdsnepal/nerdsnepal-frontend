import { Stack } from "@mui/material"
import LocalMallIcon from '@mui/icons-material/LocalMall';
export const NoStore = ()=>{

    return <Stack className="flex justify-center items-center h-full" direction={"column"} gap={2}> 
        <LocalMallIcon fontSize="large"/>
        <h2 className="text-2xl mobile:text-4xl">No store Available </h2>
    </Stack>


}