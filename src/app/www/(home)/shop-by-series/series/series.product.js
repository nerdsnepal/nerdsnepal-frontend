import ProductList from "@/app/www/component/products/product-list";
import { useSichuFetch } from "@/app/www/hooks/use-fetch";
import { Skeleton, Stack } from "@mui/material";


/*Products based on the specific series */
const SeriesProduct = ({series}) => {
    const {data,isLoading} = useSichuFetch({endPoint:`products/series?_id=${series?._id}`,revalidate:120})
    if(isLoading )return <Stack justifyContent={'center'} gap={2} padding={2} direction={'row'} flexWrap={"wrap"} >
    {
     [1,2,3,1,2,2,3].map((index)=><Skeleton key={index} variant="rounded" height={"200px"} width={'300px'} />)
    }
 </Stack>
    return (<ProductList products={data} />);
}
 
export default SeriesProduct;