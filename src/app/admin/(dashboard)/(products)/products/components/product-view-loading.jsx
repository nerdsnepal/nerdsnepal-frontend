import  React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Avatar } from '@mui/material';
import { skeletonSX } from '@/app/lib/utils/utils';

export default function ProductViewLoading() {
  return (
    <Stack direction='column' className="m-4" spacing={3} >
         <Stack  direction='row' spacing={7} >
      <Skeleton sx={skeletonSX} className="w-[50%]" variant="rectangular"  height={400} />
      <div  className=" flex items-center   w-[50%] ">
        <div className=" w-[100%] h-auto">
      <Stack direction='column' spacing={4} >
      <Skeleton sx={skeletonSX} className="mt-4 w-[70%]" variant="rounded"  height={35} />
      <Stack direction='column' gap={0.5}>
      <div className="w-[25%]">
        <Stack direction='row' gap={4}>
      <Skeleton sx={skeletonSX} className="w-[70%] " variant="rounded"  height={20} />
      <Skeleton sx={skeletonSX} className="w-[70%]" variant="rounded"  height={20} />
      </Stack>
      </div>
      <Skeleton sx={skeletonSX} className="w-[30%]" variant="rounded"  height={25} />
      <Skeleton sx={skeletonSX} className="w-[30%]" variant="rounded"  height={15} />
      </Stack>

    <Stack direction='row' className='items-center' gap={3}>
        <Skeleton variant='circular' height={50} width={50} />
      <Skeleton sx={skeletonSX} className=" mt-2 w-[60%]" variant="rounded"  height={25} />
      </Stack>
      
      <Skeleton sx={skeletonSX} className="w-[35%]" variant="rounded"  height={28} />
      </Stack>
      </div>
      </div>
      
      </Stack>
      <Stack  direction='row' spacing={6}>
      <Skeleton sx={skeletonSX}  className="w-[55%]" variant="rounded"  height={150} />
      <Skeleton sx={skeletonSX}   className="w-[45%]" variant="rounded"  height={100} />
    </Stack>
    </Stack>
  );
}