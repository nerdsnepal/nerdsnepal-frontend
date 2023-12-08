import Notfound from "@/app/not-found";
import { isEmpty } from "@/app/lib/utils/utils";
import SpecificCollection from "./specific.collection";


const CurrentSeries = (props) => {
   let _id = null;
    try {
         _id = props.searchParams._id 
    } catch (error) {
        _id=null
    }
    return (<>
    {
        isEmpty(_id)?<Notfound/>: <SpecificCollection props={props}  id={_id} />
    }
    </>);
}
 
export default CurrentSeries;