import { Box } from "@mui/material";
import Search from "../../component/search/search";
import TrendingProducts from "../../component/trending/trending";

export const metadata= {
    title:"Search products",
    description:"Search product"
}
const SearchPage = () => {
    return (<Box padding={0}>
        <Search/>
        <TrendingProducts/>
    </Box>);
}
 
export default SearchPage;