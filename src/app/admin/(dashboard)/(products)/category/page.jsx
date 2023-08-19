'use client'
import UploadMedia from "@/app/lib/components/UploadMedia";
import CategoryToolbar from "./components/toolbar";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "@/app/loading";
import CategoryList from "./components/category-list";
import { fetchCategories } from "./action/actions";



const CategoryPage = () => {
    const storeId = useSelector((state)=>state.auth.storeId)
    const accessToken = useSelector((state)=>state.auth.accessToken)
    const [isLoading,setLoading]= useState(true)
    const [categories, setCategories] = useState(null)
    useEffect(()=>{
            const fetch= async()=>{
                try {
                  const {categories} = await  fetchCategories({storeId,accessToken})
                  setCategories(categories)
                  console.log(categories);
                } catch (error) {
                    console.log(error);
                }finally{
                    setLoading(false)
                }
            }
            fetch()
    },[storeId])
    return (<div className="m-2">
          <CategoryToolbar/>
            <Suspense fallback={<Loading/>}>
            <CategoryList accessToken={accessToken} categories={categories}/>
            </Suspense>
    </div>);
}
 
export default CategoryPage;