'use-client'

import getIcon from "../getIcon"
import feather from "feather-icons"

const AdminToolBar = () => {
    const storeInfo = {
        store:"Xyz",
        storeLogo:"https://www.freecodecamp.org/news/content/images/size/w2000/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg",
        name:"Safal Shrestha",
        profile:"https://www.freecodecamp.org/news/content/images/size/w2000/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg"
    }
    const searchIcon = getIcon(feather.icons.search)
    return <div className="grid w-full justify-center items-center fixed grid-cols-3 h-12 z-10 top-0 left-0 bg-green-500">
        <span className="flex justify-self-start"><img src={storeInfo.storeLogo} className="overflow-hidden h-8 w-8 rounded-full"/><span>{storeInfo.name}</span></span>
        <div className="justify-self-start">
            <h2>Welcome Back</h2>
        </div>
        <div className="flex space-x-4 w-full bg-red-500 justify-self-end">
        <span>{searchIcon}</span>
        <span>Notification</span>
        <span>User Profile</span>
        </div>
    </div>
}
 
export default AdminToolBar;