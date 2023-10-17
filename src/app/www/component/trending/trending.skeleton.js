import { Skeleton, Stack } from "@mui/material";

const Loading = () => {
    const items = [0,1,2,3];
    return ( <Stack direction={'column'} justifyContent={'center'}>
  <Skeleton variant='text' width={180} height={35} />
       <Stack direction={"row"}   flexWrap={'wrap'} display={'flex'} justifyContent={'center'} gap={2}>
                {
                    items.map((value,index)=>{
                        return  <Skeleton variant='rounded'  key={value}  className="rounded-md shadow-sm" width={300} height={200} />
                    })
                }
            </Stack>
       <Skeleton variant='text' width={120} height={25} />
    </Stack>);
}
 
export default Loading;