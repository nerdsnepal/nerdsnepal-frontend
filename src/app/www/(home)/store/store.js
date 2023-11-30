import { Box,  Stack,  Typography } from "@mui/material";
import ProductList from "../../component/products/product-list";
import { CategoryItem } from "../../component/category-item";
import { StoreInfoMenu } from "./menu";
import { isEmpty } from "@/app/lib/utils/utils";


const StoreProductInfo = ({data,tab,storeId,q}) => {
    const regexPattern = new RegExp(q, 'i');
   const Category = ()=>{
    let categories = data.categories;
    if(!isEmpty(q)){
        categories = categories.filter(({name})=>regexPattern.test(name))
    }
    if(categories.length===0){
        return <Typography variant="h5" padding={2}>Not found</Typography>
    }
    const category =categories.map((category,index)=>{
        const url = category?.images[0]?.url;
        return <div key={index}>
                <CategoryItem _id={category._id}  name={category.name} url={url} />
            </div>})

            return <Box>
                <Typography variant="body1" padding={2} fontWeight={'bold'}>Categories</Typography>
                <Stack padding={1} direction={'row'}  className="h-fit" justifyContent={'start'} flexWrap={'wrap'} gap={1}>
            {category}
        </Stack>
            </Box>
   }
   let products = data.products;
   if(!isEmpty(q)){
    products= products.filter(({name,category,seo})=>regexPattern.test(name)|| regexPattern.test(category.name)||regexPattern.test(seo.title) );
   }
    const tabs = [
        {tab:"home",child: <Category/> ,label:"Home"},
        {
            tab:"allproducts",
        child:<ProductList products={products} itemsPerPage={20}/>,
        label:"All products"},

        {tab:"about",child:<>About</>,label:"About"}

    ];

   const selected = tabs.filter((_tab)=>_tab.tab===tab)
   
    return ( <>
    <StoreInfoMenu tabs={tabs} tab={tab} storeId={storeId}  />
    {
        selected.length==0?<Category/>:selected[0].child
    }
    </> );
}
 
export default StoreProductInfo;