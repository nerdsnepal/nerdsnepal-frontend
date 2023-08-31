'use client'
import UploadMedia from "@/app/lib/components/UploadMedia";
import CategoryToolbar from "./components/toolbar";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "@/app/loading";
import CategoryList from "./components/category-list";
import { fetchCategories } from "./actions/action";
const CategoryPage = () => {
    const storeId = useSelector((state)=>state.auth.storeId)
    const accessToken = useSelector((state)=>state.auth.accessToken)
    const [isLoading,setLoading]= useState(true)
    const [categories, setCategories] = useState(null)
    useEffect(()=>{
            (async()=>{
                try {
                    const {categories} = await  fetchCategories({storeId,accessToken})
                    setCategories(categories)
                    console.log(categories);
                  } catch (error) {
                    console.log(error);
                  }finally{
                      setLoading(false)
                  }
            })()
    },[storeId])
    const handleDeleteCategory = (category)=>{
        let newCategory = categories.filter((_category)=>_category!==category)
        setCategories(newCategory)
    }
    return (<div className="m-2">
          <CategoryToolbar/>
            <Suspense fallback={<h1>Loading...</h1>}>
            <CategoryList onDelete={handleDeleteCategory} accessToken={accessToken} categories={categories}/>
            </Suspense>
    </div>);
}
 
export default CategoryPage;