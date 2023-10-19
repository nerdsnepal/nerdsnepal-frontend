import { Breadcrumbs } from "@mui/material";
import Link from "next/link";

const SichuBreadCrumbs = ({breadcrumbs}) => {
    return (<Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs?.map(({value,url},index)=> <Link href={url} className={index<breadcrumbs.length-1?'font-bold':''} style={{color:'black'}} underline="hover" color="inherit" key={index}>{value}</Link>)}
     </Breadcrumbs> 
    );
}
 
export default SichuBreadCrumbs;