import { API_URL } from "@/app/lib/utils/utils";
import { Box,  Divider,  Stack, Typography } from "@mui/material";
import Image from "next/image";

const StoreDetails = ({store}) => {
  
    return (<Box className="m-2">
       <div></div>
        <Stack className="bg-slate-50 rounded-md h-[180px]" direction={{xs:"column",md:"row"}}  justifyContent={{xs:'center',md:'start'}} alignItems={'center'} >
        <Stack gap={2} direction={'row'} justifyContent={'center'} alignItems={'center'} className="m-2 w-[25%]" >
            <Image src={API_URL(store.logo)} height={200} width={200} alt={store.name} />
            <Typography variant="h5"  >{store.name}</Typography>
        </Stack>
        <span className="w-[0.5px] h-[150px] m-2 bg-slate-300"></span>
        <Stack gap={2} justifyContent={'start'} alignItems={'center'}  className="m-2 w-[35%]">
         <Typography variant="body1">About Store</Typography>
            <Typography variant="h5"  >{store.description}</Typography>
        </Stack>
        {/*<span className="w-[0.5px] h-[150px] m-2 bg-slate-300"></span>
        <Stack gap={2} justifyContent={'start'} alignItems={'center'}  className="m-2 w-[33%]">
         <Typography variant="body1">Store Rating</Typography>
          
        </Stack>*/}
    </Stack>
    </Box>);
}
 
export default StoreDetails;