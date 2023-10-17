import { APPNAME } from "@/app/lib/utils/utils";
import ShopAll from "./shop-all";

export const metadata = {
    title:APPNAME+' - Shop all'
}

const ShopAllPage = (props) => {
    return ( <ShopAll props={props} />);
}
 
export default ShopAllPage;