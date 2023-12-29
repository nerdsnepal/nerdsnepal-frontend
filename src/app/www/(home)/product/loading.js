import { Box, Skeleton, Stack } from "@mui/material";

const Loading= ()=>{
    return <Box padding={2}>
        <Stack direction={{xs:'column', md:'row'}} gap={3}>
            <Stack gap={2}>
            <Skeleton height={100} width={100} variant="rounded"/>
            <Skeleton height={100} width={100} variant="rounded"/>
            </Stack>
            <Skeleton height={300} width={300} variant="rounded"/>
            <Stack>
                <Skeleton variant="text" width={250} />
                <Skeleton variant="text" width={200} />
                <Skeleton variant="text" width={150} />

            </Stack>
        </Stack>
       <Stack padding={2} gap={2}>
       <Skeleton  height={50} variant="rounded"/>
        <Skeleton height={50} variant="rounded"/>
       </Stack>

    </Box>
}
export default Loading;