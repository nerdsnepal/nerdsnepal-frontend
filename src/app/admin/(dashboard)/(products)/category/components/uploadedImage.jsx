import { API_URL } from "@/app/lib/utils/utils";
import { CloseOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useSelector } from "react-redux";
import { removeImage } from "../actions/action";

const UploadedImage = ({url,onRemoved}) => {
    const originalUrl = API_URL(url)
    const storeId = useSelector((state)=>state.auth.storeId)
    const accessToken = useSelector((state)=>state.auth.accessToken)
    const remove=async ()=>{
        onRemoved(url)
      try{
        await removeImage({accessToken,storeId,path:url})
      }catch(error){
            //error handling here
      }
    }


    return (
        <div className="border relative">
            <CloseOutlined onClick={remove} className="absolute right-1 font-bold hover:bg-gray-200 text-white cursor-pointer bg-gray-400 rounded-full"/>
            <Image 
                src={originalUrl}
                alt=""
                draggable={false}
                className="h-[90px] w-[80px] object-cover cursor-pointer"
                width={100}
                height={125}
            
            />
        </div>
    );
}
 
export default UploadedImage;