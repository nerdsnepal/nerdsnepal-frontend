import  React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
export default function Loading(){
    let items = [1,2,3,4];
    return(<Box>
    <Skeleton   className="w-[100%] h-[400px] mobile:h-[800px]" variant="rectangular"  />
    <Box height={50}></Box>
    <Stack gap={1} flex={'display'} justifyContent={'center'} alignItems={'center'}>
    <Skeleton variant='text' width={180} height={35} />
       <Stack direction={"row"}   flexWrap={'wrap'} display={'flex'} justifyContent={'center'} gap={2}>
                {
                    items.map((value,index)=>{
                        return  <Skeleton variant='rounded'  key={value}  className="rounded-md shadow-sm" width={300} height={200} />
                    })
                }
            </Stack>
       <Skeleton variant='text' width={120} height={25} />
    </Stack>
    <Box height={50}></Box>
    </Box>
    )
}