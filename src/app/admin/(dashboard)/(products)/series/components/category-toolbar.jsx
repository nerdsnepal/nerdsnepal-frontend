import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchCategories } from "../actions/action";
import { useSelector } from "react-redux";
import { useSichuFetch } from "@/app/www/hooks/use-fetch";

const GridDataCategoryToolbar = () => {
    const accessToken = useSelector((state)=>state.auth.accessToken)
    const [series,setSeries] = useState([])
    

    return <Box className="relative h-12    " sx={{top:'5px'}}>
            <div className="absolute right-5">
        <Button variant="contained" color="success" className="m-2">Edit</Button>
        <Button variant="contained" color="error" className="m-2">Delete</Button>
        </div>
    </Box>
}
 
export default GridDataCategoryToolbar;