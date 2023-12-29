import { Button } from "@mui/material";
import Link from "next/link";

const ProductPageNavbar = () => {
    return (<>
        <div className="relative">
            <Button variant="outlined" className="absolute bg-blue-500 right-5 top-2"><Link href={'products/add'} className="capatalize text-white">Add</Link></Button>
        </div>
    
    </>);
}
 
export default ProductPageNavbar