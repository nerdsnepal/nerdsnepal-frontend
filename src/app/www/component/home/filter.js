import { Icon, Stack, Typography } from "@mui/material";
import CategoryList from "../category-list";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";


const Category = ({categories})=>{
    const [expand,setExpand] = useState(true)
     return <>
       <Stack direction={'row'} justifyContent={'space-between'}  className="w-[300px]" height={50} alignItems={'center'}>
       <Typography className="capitilized font-bold" variant="body1"> Category</Typography>
        <Icon className="cursor-pointer" onClick={()=>setExpand((prev)=>!prev)}>{ !expand?<ExpandMore/>:<ExpandLess/>} </Icon>
       </Stack>
       {
        expand? <CategoryList categories={categories} />:null
       }
        </>
}

const FilterProduct = ({data}) => {
    return (<>
        <Category categories={data?.categories} /> 
    </>);

}
 
export default FilterProduct;