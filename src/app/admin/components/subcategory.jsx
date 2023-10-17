import { isEmpty } from "@/app/lib/utils/utils";
import { Alert, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const SubCategory = ({subCategory,parent,onSaved,onChangeSubCategory}) => {
    const [category,setCategory] = useState({
        parent:parent,
        subcategory:subCategory!==undefined?subCategory:['']
    })
    useEffect(()=>{
        if(onSaved){
            if(isEmpty(subCategory[0]))
            setCategory({parent:'',subcategory:['']})
        }
    },[onSaved])

    const [error,setError] = useState({hasError:false,message:""})
    
    const handleOnChange = (e,index)=>{
        if(isEmpty(e.target.value)){
            checkDuplicate()
            if(index===0)return
            let currentCategory = {...category}
            delete currentCategory.subcategory[index]
            setCategory(currentCategory)
            return
        }
        if(category.subcategory.length===index+1){
            let newCategory = {...category}
            newCategory.subcategory.push('')
            setCategory(newCategory)
        }
        let newCategory = {...category}
        newCategory.subcategory[index]= e.target.value 
        setCategory(newCategory)
        checkDuplicate()
       onChangeSubCategory(newCategory,error)
    }
    const checkDuplicate = ()=>{
        if(new Set(category.subcategory).size!= category.subcategory.length){
            setError({hasError:true,message:"Duplicate category found"})
        }else{
            setError({hasError:false,message:""})
        }
    }

    return (<>
        {
            error&&error?.hasError?
            <Alert severity="error" className="sticky top-0">
                {error.message}
            </Alert>
            
            :<></>
        }
          <Stack  className="overflow-auto max-h-[220px]" direction={"column"} gap={1}>
        {
            category.subcategory.map((value,index)=>{
                //console.log(value);
                return <TextField
                    value={value}
                    size="small"
                    className="mt-1 ml-8 mr-1"
                    label="Subcategory"
                    key={index}
                    onChange={(e)=>handleOnChange(e,index)}
                />
            })
        }
       </Stack>
    </>);
}
 
export default SubCategory;