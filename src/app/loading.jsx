import { CircularProgress, Stack } from "@mui/material";

const Loading = () => {
    return <div className="relative">
        <Stack className="absolute h-[100vh] w-[100vw] flex justify-center items-center">
          <CircularProgress/>
      </Stack>
    </div>
}
 
export default Loading;