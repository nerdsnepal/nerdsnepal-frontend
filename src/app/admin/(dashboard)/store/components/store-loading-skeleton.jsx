import { skeletonSX } from "@/app/lib/utils/utils";
import { Skeleton, Stack } from "@mui/material";

const StoreLoadingSkeleton = () => {
    return (<div className="flex justify-center items-center mt-14" >
    <Stack direction={"column"} className="w-[100%] mobile:w-[72vw]" gap={2} sx={{ height: 500}}>
        <Skeleton variant="rounded" sx={skeletonSX}  height={80} animation="wave" />
        <Skeleton variant="rounded" sx={skeletonSX} height={280} animation="wave" />
        <Skeleton variant="rounded" sx={skeletonSX} height={100} animation="wave" />
        </Stack>
        </div>
    );
}
 
export default StoreLoadingSkeleton;