import { Button } from "@mui/material";
import Link from "next/link";

const ProductPageNavbar = () => {
    return (<>
        <div>
            <Button><Link href={'products/add'}>Add</Link></Button>
        </div>
    
    </>);
}
 
export default ProductPageNavbar