import { Stack } from "@mui/material";
import Image from "next/image";

const Loading = () => {
    return <div className="relative">
        <Stack className="absolute  h-[100vh] w-[100vw] bg-white z-[99999] flex justify-center items-center">
         <Image src={'logo.svg'}  alt="logo loading" height={250} width={250}
         className="rounded-full select-none object-fill aspect-square"
         />
      </Stack>
    </div>
}
 
export default Loading;