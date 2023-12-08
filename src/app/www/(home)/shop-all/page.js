import { APPNAME } from "@/app/lib/utils/utils";
import AllProduct from "./products-all";

export const metadata = {
    title:APPNAME+' - Shop all'
}

const ShopAllPage = (props) => {
    return ( <AllProduct props={props} />);
}
 
export default ShopAllPage;