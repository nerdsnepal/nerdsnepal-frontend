import ProductItem from "@/app/www/component/products/product-item";
import { useSichuFetch } from "@/app/www/hooks/use-fetch";
import { Box, Stack } from "@mui/material";

/*Products based on the specific series */
const SeriesProduct = ({category}) => {
    const {data,isLoading} = useSichuFetch({endPoint:`products/category?name=${category.name}&subcategory=${category.subCategory} `,revalidate:120})
    if(isLoading)return <h1>Loading..</h1>
  
    return (<Box padding={4}>
        {
            data.length===0?<h1>No product found</h1>:null
        }
        <Stack direction={'row'} justifyContent={'center'} gap={1} flexWrap={'wrap'} >
          {
            data.map((product,index)=><ProductItem key={index} product={product} />)
          }
        </Stack>

    </Box>);
}
 
export default SeriesProduct;