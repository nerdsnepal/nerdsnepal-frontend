"use client"
import { Box, Divider, Stack, Typography } from "@mui/material";
import FilterProduct from "../../component/home/filter";
import PriceFilter from "../../component/home/price-filter";
import SelectedCategoryForFilter from "../../component/home/selected-category";
import ProductList from "../../component/products/product-list";
import { useSichuFetch } from "../../hooks/use-fetch";

const filter = ({searchParams,data})=>{
      const { category, min, max } = searchParams;
      
      // Check if all necessary parameters are present
      const shouldFilter = category || min !== undefined ||max !== undefined;
      let products;
      
      if (shouldFilter) {
        const desiredSubcategories = category.split(',');
        // Filter products based on category, subcategories array, and price range
        products = data?.products.filter((product) => {
          
          const meetsCategory = category===''?true: desiredSubcategories.includes(product.category.name);
          const meetsSubcategory =category===''?true: desiredSubcategories.some(subcategory => product.category.subcategory.includes(subcategory));
          let meetsPriceRange= true 
          
          if(Number(min)!==0 && Number(max)!==0){
            meetsPriceRange = Number(product.price.mrp) >= Number(min)&& Number(product.price.mrp) <= Number(max);
          } 
          return (meetsCategory || meetsSubcategory)&&meetsPriceRange;
        });
        data.filtered = products||[]
      } else {
        // If any necessary parameter is missing, don't apply filtering
        data.filtered = data?.products;
      }
    return data
}

const ShopAll = ({props}) => {
    let {data,isLoading} = useSichuFetch({endPoint:""})
    if(isLoading)return null
    data= filter({data,searchParams:props.searchParams})

    return (<Stack direction={{xs:'column',md:'row'}}> 
        <Box padding={4} gap={2} className="w-full mobile:w-[350px]" >
        <Typography variant="body1" className="font-bold">Filters</Typography>
        <Divider className="m-1"/>
        <SelectedCategoryForFilter props={props} />
        <PriceFilter data={data} />
        <Divider className="m-1" />
        <FilterProduct data={data}/>
        </Box>
        <ProductList products={data?.filtered} />
    </Stack> );
}
 
export default ShopAll;