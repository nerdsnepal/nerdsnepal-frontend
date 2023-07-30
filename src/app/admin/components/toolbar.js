'use-client'
import Image from "next/image"
import getIcon from "../getIcon"
import feather from "feather-icons"
import UserProfile from "./UserProfile"

const AdminToolBar = () => {
    const storeInfo = {
        store:"Xyz",
        storeLogo:"/next.svg",
        name:"Safal Shrestha",
        profile:"https://www.freecodecamp.org/news/content/images/size/w2000/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg"
    }
    const options = {width:24,height:24,"stroke-width":3.5}
    const searchIcon = getIcon(feather.icons.search,options)
    const notificationIcon = getIcon(feather.icons.bell)
    return <div className="grid w-full justify-center items-center overflow-hidden fixed grid-cols-2 mobile:grid-cols-3 mobile:h-[90px] h-[60px] top-0 left-0 border-b border-gray-50  mobile:px-6">
        <span className="flex justify-self-start fill-current">
            <a href="#" >
            <Image width={80} placeholder="empty" height={80} alt={storeInfo.store.toString()} src={storeInfo.storeLogo}  draggable={false} className="dark:invert overflow-hidden w-12 h-12 mx-6"/>
            </a>
            <span>{storeInfo.name}</span></span>
        <div className="justify-self-start hidden mobile:block laptop:relative laptop:left-[-120px]">
            <h2 className="font-bold">Welcome Back</h2>
        </div>
        <div className="flex space-x-4 w-full h-full mobile:justify-center items-center justify-start ">
        <span>{searchIcon}</span>
        <span className="cursor-pointer relative shrink-0">
            <a href="#">{notificationIcon}
            <span className="absolute top-[-4px] text-center right-[-9px] p-[3px] w-fit h-fit text-[12px] bg-red-500  text-white rounded-full">9+</span>
            </a>
        </span>
        <span className="shrink-0"><UserProfile name={storeInfo.name} profileUrl={storeInfo.profile} /></span>
        </div>
    </div>
}
 
export default AdminToolBar;