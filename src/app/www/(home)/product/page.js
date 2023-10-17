import { fetchSichu } from "../../actions/action";
import Product from "./product";
import { isEmpty } from "@/app/lib/utils/utils";
export async function generateMetadata({ params, searchParams }) {
    let seo = {
        title:"Product",
        description:""
       }
   const {data} =await fetchSichu({endPoint:`v2/product?_id=${searchParams?._id}`})
   if(data){ 
    const {title,description,mediaUrls} = data?.seo
    const name = data?.name 
    const _description = data?.description
    if(isEmpty(title)){
       seo.title=name 
    }else{
       seo.title= title
    }
    if(isEmpty(description)){
       seo.description = _description
    }else{
       seo.description= description
    }
    
    return {title:seo.title,description:seo.description}
}
}
const SingleProductPage = async(props) => {
    return (<>
    <Product props={props} />
    </>);
}
 
export default SingleProductPage;