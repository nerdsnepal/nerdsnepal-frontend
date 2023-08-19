'use client'
import { Alert, Card, Checkbox, FormControl, MenuItem, Select, Snackbar, Stack, TextField } from "@mui/material";
import AddProductPageToolbar from "../../../../components/add-product-toolbar";

import UploadMedia from "@/app/lib/components/UploadMedia";
import ProductSearchEngineListing from "@/app/admin/components/product-search-engine-listing";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TextEditor from "@/app/admin/components/text-editor";
import AddProductVariant from "@/app/admin/components/add-variant";
import CategoryForProduct from "@/app/admin/components/category-input-product";
import Status from "@/app/admin/components/status";
import AddInventoryForProduct from "@/app/admin/components/add-inventory";
import { isEmpty } from "@/app/lib/utils/utils";
import { addProduct } from "../actions/action";
import { useRouter } from "next/navigation";

const ProductAddPage = () => {
    const accessToken = useSelector((state)=>state.auth.accessToken)
    const [response,setResponse]  = useState({
        isShow:false,
        servity:"info",
        message:""
    })
    const storeId = useSelector((state)=>state.auth.storeId)
    const [profitMargin,setProfitMargin] = useState({
        profit:'---',
        percentage:'---',
        loss:false
    })
    let [product,setProduct]= useState({
        name:"", //Product Name 
        description:"",
        status:true, // for the product is live or not 
        price:{
            mrp:'', // Selling Price
            compare_at:'' 
        },
        tax:false, // indicate the charge tax on product or not 
        costPrice:'',
        mediaUrls : [],
        variants:[],
        seo:{
            title:'',
            description:''
        },
        category:{
            name:'',
            subcategory:[]
        },
        inventory:null
    
    })
    useEffect(()=>{
        if(!isEmpty(product.price.mrp) && !isEmpty(product.costPrice)){
            const sp = Number(product.price.mrp) 
            const cp = Number(product.costPrice)
            if(sp>=cp){
                const profit= sp-cp;
                const percentage = Math.ceil((profit*100)/cp);
                setProfitMargin({profit,percentage:`${percentage} %`}) 
            }else{
                setProfitMargin({profit:'---',percentage:'---',loss:true}) 
            }
        }else{
            setProfitMargin({profit:'---',percentage:'---'}) 
        }


    },[product])

    useEffect(()=>{
        setProduct({...product,mediaUrls:[],inventory:null,category:{
            name:'',
            subcategory:[]
        }})
    },[storeId])

    // uploading state handle 
    const stateOfUploading = (state)=>{
        if(state==="idel")return
       }
       const onUploadSuccessfully = ({urls})=>{
        if(urls===undefined)return
        let updatedUrls = Array.from(urls)
        setProduct({...product,mediaUrls:updatedUrls})
      
    }

    const save=async()=>{
        if(product){
            if( product.inventory)
            product.inventory.locations=undefined 
            if(product.variants)
            product.variants.map((variant)=>variant.isEditMode=undefined)
        }
        product.storeId = storeId
        try{
        const res =await addProduct({accessToken,product})
            setResponse({isShow:true,servity:"success",message:res.message})
        }catch(error){
            setResponse({isShow:true,servity:"error",message:"Something went wrong"})
        }finally{
            setTimeout(()=>{
                setResponse({...response,isShow:false})
                if(response.servity==="error")return
                setProduct({
                    name:"", //Product Name 
                    description:"",
                    status:true, // for the product is live or not 
                    price:{
                        mrp:'', // Selling Price
                        compare_at:'' 
                    },
                    tax:false, // indicate the charge tax on product or not 
                    costPrice:'',
                    mediaUrls : [],
                    variants:[],
                    seo:{
                        title:'',
                        description:''
                    },
                    category:{
                        name:'',
                        subcategory:[]
                    },
                    inventory:null
                
                })
            },3000)
        }

    }
 
    return (<div className="relative overflow-y-scroll -z-30 p-4  h-screen">
        <Snackbar open={response.isShow} autoHideDuration={3000}>
        <Alert servity={response.servity}>{response.message}</Alert>
        </Snackbar>
        
        <AddProductPageToolbar product={product}  onCancel={()=>alert("Hello")} onSave={save}/>
        <form className="flex flex-row justify-center">
         <div className="laptop:grid block  w-[100%] mobile:w-[90%] gap-3 laptop:grid-cols-2">
           <div className="space-y-3 gap-6">
           <Card className="p-4 space-y-2">
            <h2>Title</h2>
            <TextField 
               autoComplete="off"
               value={product.name}
                label="Title" fullWidth={true} 
                onChange={({target})=>{
                    setProduct({...product,name:target.value})
                }}
                />
                <h2>Description</h2>
                <TextEditor  content={product.description} onChange={(value)=>{
                    setProduct({...product,description:value})
                }}/>
           </Card>
           <Card className="space-y-5 p-4 h-[225px]">
                <h2>Media</h2>
                <div className="flex justify-center items-center">
                <UploadMedia 
                clearState={product.mediaUrls===0?true:false}
                onUploadedMedialUrl={onUploadSuccessfully}
                state={stateOfUploading}
                 btnName={"Add media"}
                 hideUploadedImageView={false}
                 />
                 </div>
           </Card>

           <Card className="mobile:space-y-5 space-x-5 p-4 ">
                <h2>Pricing</h2>
                {/* Selling Price */}
                <div className="inline-block  mobile:space-x-2">
                    <TextField value={product.price.mrp}
                     inputProps={{min:0}} type="number" inputMode="number"
                      label="Price" placeholder="Rs 10,000"
                      onChange={(e)=>{
                        let newData = {...product}
                        newData.price.mrp= e.target.value
                        setProduct(newData)
                      }}/>
                    <TextField value={product.price.compare_at}
                     inputProps={{min:0}} type="number"
                      inputMode="number" label="Compare-at-price"
                       placeholder="Rs 10,050"
                       onChange={(e)=>{
                        let newData = {...product}
                        newData.price.compare_at= e.target.value
                        setProduct(newData)
                      }}/>
                </div>
                {/* Tax */}
                <div>
                   <Checkbox 
                   value={product.tax}
                   onChange={(e)=>{
                    const newProduct = {...product} 
                    newProduct.tax = !newProduct.tax 
                    setProduct(newProduct)
                   }}/> <label>Charge tax on this product</label>
                </div>
                {/* Cost Price */}
                <h2>Cost Price</h2>
                <div className="inline-block  space-x-2">
                    <TextField value={product.costPrice} inputProps={{min:0}} type="number" inputMode="number"
                     label="Cost-per-item" placeholder="Rs 9,000" 
                     onChange={(e)=>{
                        let newData = {...product}
                        newData.costPrice= e.target.value
                        setProduct(newData)
                      }}
                      />
                    <TextField error={profitMargin.loss} label="Profit" className="w-[25%] mobile:w-[20%]" value={profitMargin.profit} disabled/>
                    <TextField error={profitMargin.loss} label="Margin" className="w-[25%] mobile:w-[20%]" value={profitMargin.percentage} disabled/>
                </div>
           </Card>
            {/* Variants */}
            <Card className="space-y-5 p-4">
                <h2>Product Variant</h2>
                <AddProductVariant value={product.variants} onChangeVariant={(value)=>{
                    setProduct({...product,variants:value})
                }} />
            </Card>
            <div className="h-[100px]"></div>
           </div>
         <div>
         <Stack direction={"column"} gap={1.5} >
           <Card className=" p-4">
            <h2>Status</h2>
                <Status 
                    onChange={(value)=>{
                    setProduct({...product,status:value})
                    }}
                value={product.status}/>
           </Card>
           {/* Inventory */}
           <Card className=" p-4">
             <Stack direction={"column"} gap={1}>
             <h2>Inventory</h2>
                <AddInventoryForProduct value={product.inventory} onChangeInventory={(inventory)=>{
                    setProduct({...product,inventory:inventory})
                }}/>
             </Stack>
           </Card>
           <Card className=" p-4 space-y-4">
                <h2>Category</h2>
                <CategoryForProduct value={product.category} multiple={true} 
                onSelectSubCategory={(value)=>{
                    let newProduct = {...product} 
                    newProduct.category.subcategory = value 
                    setProduct(newProduct)
                }}
                onSelect={(value)=>setProduct({...product,category:{name:value.name,subcategory:[]}})}
                />
           </Card>
           <Card className="p-4 ">
                <ProductSearchEngineListing 
                    value = {product.seo}
                   onChangeTitle={(title)=>{
                    let newData = {...product}
                    newData.seo.title = title
                    setProduct(newData)
                   }}
                   onChangeDescription={(description)=>{
                    let newData = {...product}
                    newData.seo.description = description
                    setProduct(newData)
                   }}
                />
            </Card>
           <div className="h-[160px]"></div>
           </Stack>
         </div>
          
         </div>
     
        </form>

    </div>);
}
 
export default ProductAddPage;