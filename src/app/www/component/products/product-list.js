import { Stack } from "@mui/material";
import ProductItem from "./product-item";

const ProductList = ({products,justifyContent='center'}) => {
    const NoProductFound = ()=>{
        return <h1 className="p-4">No product found</h1>
    }
    return (<>
    {products?.length==0?<NoProductFound/>:null}
        <Stack display={'flex'} direction={'row'} flexWrap={'wrap'} padding={2} justifyContent={justifyContent} gap={1.2}>
            {
                products?.map((product,index)=>{
                    return <ProductItem product={product} key={index}/>
                })
            }
        </Stack>
    
    </>);
}
 
export default ProductList;