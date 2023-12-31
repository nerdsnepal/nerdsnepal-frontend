import ProductList from "@/app/www/component/products/product-list";
import { useSichuFetch } from "@/app/www/hooks/use-fetch";
import { Skeleton, Stack } from "@mui/material";

const CollectionProduct = ({category}) => {
    const {data,isLoading} = useSichuFetch({endPoint:`products/category?name=${category?.name}&subcategory=${category?.subCategory}`,revalidate:120})
    if(isLoading)return <Stack justifyContent={'center'} gap={2} padding={2} direction={'row'} flexWrap={"wrap"} >
    {
     [1,2,3,4,5,6,7].map((index)=><Skeleton key={index} variant="rounded" height={"200px"} width={'300px'} />)
    }
 </Stack>
    return (<ProductList products={data} />);
}
 
export default CollectionProduct;