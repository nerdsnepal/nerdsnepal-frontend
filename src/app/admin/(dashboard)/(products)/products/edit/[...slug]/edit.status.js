import Status from "@/app/admin/components/status"

const EditStatus = ({product,handleResponse,accessToken})=>{
    const {status} = product
    const handleOnChange = async(value)=>{
        if(status===value)return 
        let severity = 'info'
        let message = ''
        try {
            const body = {status:Boolean(value),storeId:product?.storeId,productId:product?._id}
            const result = await productAPI({body,accessToken,api:'status'})
            severity =result.success?'success':'error'
            message=result.message
        } catch (error) {
            severity='error'
            message='Something went wrong'
        }finally{
            if(severity==='info')return
            if(handleResponse)
            handleResponse(severity,message)
        }
        return
        
    }
    return <Status value={status} onChange={handleOnChange} />


}

export default EditStatus