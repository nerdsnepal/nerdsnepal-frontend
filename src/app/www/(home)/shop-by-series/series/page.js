import Notfound from "@/app/not-found";
import SpecificSeries from "./specific.series";


const CurrentSeries = (params) => {
   let _id = null;
    try {
        console.log(params);
         _id = params.searchParams._id 
    } catch (error) {
        
    }
  
    return (<>
    {
        _id===null?<Notfound/>: <SpecificSeries id={_id} />
    }
    </>);
}
 
export default CurrentSeries;