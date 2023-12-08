"use client"
import ShopAll from "../../component/shop-all";
import { useSichuFetch } from "../../hooks/use-fetch";


const AllProduct = ({props}) => {
    let {data,isLoading} = useSichuFetch({endPoint:""})
    if(isLoading)return null
    return (<>
    <ShopAll  props={props} data={data} />
    </>);
}
 
export default AllProduct;