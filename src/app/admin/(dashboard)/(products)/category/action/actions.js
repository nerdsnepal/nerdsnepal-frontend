'use server'

const { API_URL, isEmpty } = require("@/app/lib/utils/utils")
const { default: axios } = require("axios")

export const fetchCategories = async ({storeId,accessToken})=>{
    const headers = {
            'authorization':`bearer ${accessToken}`
    }
    const response = await fetch(API_URL(`admin/category?storeId=${storeId}`),{
        method:"GET",
        cache:"no-cache",
        headers:headers,
        next:{
            revalidate:30
        }
    })
    return await response.json()
}
export const fetchCategoriesWithStatus = async ({storeId,accessToken,status=true})=>{
    const headers = {
            'authorization':`bearer ${accessToken}`
    }
    const response = await fetch(API_URL(`admin/category?status=${status}&storeId=${storeId}`),{
        method:"GET",
        cache:"no-cache",
        headers:headers,
        next:{
            revalidate:30
        }
    })
    return await response.json()
}



export const removeImage = async({storeId,accessToken,path})=>{
    const headers = {
        'authorization':`bearer ${accessToken}`
    }
    const res = await axios.delete(API_URL('upload'),{storeId,path},{headers:headers})
    console.log(res);
    return res.data
}
export const save_category = async({name,imageUrl,status,subCategory,accessToken,storeId})=>{
    let _subCategory = subCategory.filter((value)=>value!=='')
    
    const headers = {
        'authorization':`bearer ${accessToken}`
    }
    const data ={
        name,urls:imageUrl,status,storeId,subCategory:_subCategory
    }
    let response = await axios.post(API_URL('admin/category'),data,{headers:headers})
    return response.data

}