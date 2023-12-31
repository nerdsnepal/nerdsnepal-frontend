'use client'

import ProductPageNavbar from "@/app/admin/components/product-navbar";
import {   useSearchParams } from "next/navigation"
import {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllStoreRelatedProduct } from "./actions/action";
import { Stack } from "@mui/material/index";
import { StoreProductList } from "./components/product-list";
import StoreLoadingSkeleton from "../../store/components/store-loading-skeleton";


export default function ProductPage (){
    const storeId = useSelector((state)=>state.auth.storeId)
    const accessToken = useSelector((state)=>state.auth.accessToken)
    const searchParams = useSearchParams()
    const [selectedView,setSelectedView]= useState('all')
    const [products,setProducts] = useState([])
    const [isLoading,setLoading] = useState(true)
    const [error,setError] = useState({
        hasError:false,
        message:''
    })
    //get all the query params 
   useEffect(()=>{
    for(let key of searchParams.keys()){
        if(key==='selectedView'){
            setSelectedView(searchParams.get(key))
        }
    }
   },[searchParams])
    useEffect(()=>{
        (async()=>{
            try {
                if(storeId===null||storeId===undefined)return
                setLoading(true)
               const result=await getAllStoreRelatedProduct({accessToken,storeId,selectedView})
               if(result&& result.success){
                    setProducts(result.products)
               }
            } catch (error) {
                setError({
                    hasError:true,
                    message:"Something went wrong"
                })
                //error handling
            }finally{
                setLoading(false)
            }

        })()
    },[storeId])
    const handleDelete= (product)=>{
        let newProducts = products.filter((_product)=>_product!==product)
        setProducts(newProducts)
    }
   if(error.hasError){
    return <>{JSON.stringify(error.message)}</>
   }
    return <Stack className="overflow-auto h-full">
        <ProductPageNavbar />
        { isLoading?<StoreLoadingSkeleton/>: <StoreProductList products={products} onDelete={handleDelete} />}
        </Stack>
    
}