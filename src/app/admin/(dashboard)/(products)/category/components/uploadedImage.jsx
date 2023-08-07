import { API_URL } from "@/app/lib/utils/utils";
import { CloseOutlined } from "@mui/icons-material";
import Image from "next/image";
import { removeImage } from "../action/removeImage";
import { useSelector } from "react-redux";

const UploadedImage = ({url,onRemoved}) => {
    console.log(url);
    const originalUrl = API_URL(url)
    console.log(originalUrl);
    const storeId = useSelector((state)=>state.auth.selectedStore)
    const accessToken = useSelector((state)=>state.auth.accessToken)
    const remove=async ()=>{
        onRemoved(url)
      try{
        await removeImage({accessToken,storeId,path:url})
      }catch(error){
            console.log(error);
      }
    }


    return (
        <div className="border relative">
            <CloseOutlined onClick={remove} className="absolute right-1 font-bold hover:bg-gray-200 text-white cursor-pointer bg-gray-400 rounded-full"/>
            <Image 
                src={originalUrl}
                alt=""
                width={100}
                height={125}
            
            />
        </div>
    );
}
 
export default UploadedImage;