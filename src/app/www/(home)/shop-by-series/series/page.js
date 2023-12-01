import Notfound from "@/app/not-found";
import SpecificSeries from "./specific.series";
import { isEmpty } from "@/app/lib/utils/utils";


const CurrentSeries = (params) => {
   let _id = null;
    try {
         _id = params.searchParams._id 
    } catch (error) {
        _id=null
    }
    return (<>
    {
        isEmpty(_id)?<Notfound/>: <SpecificSeries id={_id} />
    }
    </>);
}
 
export default CurrentSeries;