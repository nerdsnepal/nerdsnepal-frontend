'use client'
import {  SearchOutlined } from "@mui/icons-material";
import {  Box, TextField } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";
import { fetchSichu } from "../../actions/action";
import { useSelector } from "react-redux";
import { isEmpty } from "@/app/lib/utils/utils";
import ProductList from "../products/product-list";
const Search = () => {
    const [searchResults,setResults]= useState(null)
    const [isLoading,setLoading] = useState(false)
    const user = useSelector((state)=>state.auth.user);
    const accessToken = user?.accessToken;
    const SearchInputField= ()=>{
        const [query,setQuery] = useState("")
        const handleSubmit = (e)=>{
            e.preventDefault();
            if(isEmpty(query))return
           // setLoading(true)
            fetchSichu({accessToken,endPoint:"search/products?q="+query,revalidate:25}).then((result)=>{
                if(result.success){
                    setResults(result.data)
                }
            }).catch((error)=>{
                setResults(null)
            }).finally(()=>{
                setLoading(false)
            })
           
        }
        const handleClear = (e)=>{
            setQuery("")
        }
        return  <form  id="#search" className="m-2"  onSubmit={handleSubmit}>
                <TextField  fullWidth 
                value={query}
                style={{ border: "none" }} 
                onChange={(e)=>setQuery(e.target.value)}
                placeholder="What are you looking for?"
                InputProps={{
                startAdornment: <SearchOutlined position="start"/>,
                endAdornment: query===""?null: <ClearIcon className="cursor-pointer border-0" onClick={handleClear} />
          }}
        />
         <button type="submit" style={{ display: 'none' }}></button>
        </form>
    }
    const SearchResult = ()=>{
        return <ProductList products={searchResults} justifyContent={'center'} />
    }
    return (
    <Box className={'bg-[#D9D9D9] m-0 p-2'}>
    <SearchInputField/>
        {
            isLoading?<h2>Loading...</h2>:
            searchResults!=null?<SearchResult/>:null
        }
    </Box>
    );
}
 
export default Search;