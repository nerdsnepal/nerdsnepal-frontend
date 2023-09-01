'use client'
import Image from "next/image"
import getIcon from "../getIcon"
import feather from "feather-icons"
import UserProfile from "./UserProfile"
import { Avatar, Badge, FormControl, MenuItem, Select, Skeleton, Stack } from "@mui/material"
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector, useStore } from "react-redux"
import { useEffect, useState } from "react"
import fetchStores from "../(dashboard)/store/action/actions"
import { setSelectedStore } from "@/app/state/reducer/authSlice"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { redirect } from "next/navigation"
import { API_URL, skeletonSX } from "@/app/lib/utils/utils"

const SelectStore = ({stores,selected})=>{
    const dispatch = useDispatch()
    const styles = {
        formControl: {
          minWidth: 120,
        },
        select: {
          '&:before': {
            borderBottom: 'none', // Remove underline/border before selection
          },
          '&:after': {
            borderBottom: 'none', // Remove underline/border after selection
          },
        },
      };
      
  return  <FormControl variant="standard" sx={styles.formControl}>
  <Select
    IconComponent={KeyboardArrowDownIcon}
    value={selected.name}
    sx={styles.select}
    color="primary"
    className="dark:text-white"
    onChange={({target})=>{
        const store = stores.filter((value)=>value.name===target.value)
        dispatch(setSelectedStore(store[0]))
    }}
    >
        {
            stores.map((store,index)=>{
                if(store.name===selected.name){
                    return <MenuItem  key={index} value={store.name} selected >{store.name}</MenuItem>
                }
                return <MenuItem key={index} value={store.name} >{store.name}</MenuItem>
            })
        }
    </Select>
        </FormControl>
}


export default  function AdminToolBar  () {
  const accessToken = useSelector((state)=>state.auth.accessToken)
  const isSuperUser = useSelector((state)=>state.auth.isSuperAdmin)
  const [isLoading,setIsLoading] = useState(true)
  const [stores,setStore] = useState([])
  const user = useSelector((state)=>state.auth.user)
  const dispatch = useDispatch()
  const selectedStore = useSelector((state)=>state.auth.selectedStore)
  useEffect(()=>{
    (async()=>{
       try {
        if(isSuperUser){
            setIsLoading(false)
            return
        }
        const {stores}=  await fetchStores({accessToken})
        setStore(stores)
        if(selectedStore===null)
        dispatch(setSelectedStore(stores[0]))
        setIsLoading(false)
       } catch (error) {
        setIsLoading(false)
        //handle error
       }
    })()
  },[accessToken])
  if(!isSuperUser)
  if(!isLoading&&selectedStore===null){
    redirect("/requeststore")
  }
    const storeInfo = {
        store:isSuperUser?process.env.NEXT_PUBLIC_APP_NAME:selectedStore?.name,
        storeLogo:isSuperUser?process.env.NEXT_PUBLIC_APP_LOGO:selectedStore?.logo!=null?API_URL(selectedStore.logo):process.env.NEXT_PUBLIC_APP_STORE_LOGO,
        name:user!==null?user?.username:"unknown",
        profile:user!=null?user?.profile:"https://www.freecodecamp.org/news/content/images/size/w2000/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg"
    }
    const options = {width:24,height:24,"stroke-width":3.5}
    const searchIcon = getIcon(feather.icons.search,options)
    return <div className="grid w-full justify-center items-center overflow-hidden fixed grid-cols-2 mobile:grid-cols-3 mobile:h-[90px] h-[60px] top-0 left-0 border-b border-gray-50  mobile:px-6">
        <span className="flex justify-self-start items-center fill-current">
           <a href="#" >
            {
                isLoading?<Skeleton sx={skeletonSX} variant="rectangular" animation="wave"  width={48} height={48} />
                : <Image width={80} placeholder="empty" height={80} alt={storeInfo.store.toString()} src={storeInfo.storeLogo}  draggable={false} className="overflow-hidden aspect-square w-12 h-12 mx-6"/>
              


            }
            </a>
           {isLoading?<Skeleton sx={skeletonSX} className="m-3" variant="rectangular" width={220} height={"1.5em"} />: <span className="w-[220px] overflow-ellipsis">{storeInfo.store}</span> }
        </span>
        <div className="justify-self-start hidden mobile:block laptop:relative laptop:left-[-120px]">
        {
         isLoading?<Skeleton sx={skeletonSX} className="m-3" variant="rectangular" width={220} height={"1.5em"} />:  !isSuperUser? stores.length>1?<SelectStore selected={selectedStore} stores={stores} />:<></>:<></>
        }
        </div>
        <div className="flex space-x-4 w-full h-full mobile:justify-center items-center justify-start ">
        <span>{searchIcon}</span>
        <span className="cursor-pointer relative shrink-0">
            <Badge badgeContent={400} className="m-2" max={99} color="primary">
            <NotificationsIcon  sx={{fontSize:"60"}} />
            </Badge>
            {/*<a href="#">{notificationIcon}
            <span className="absolute top-[-4px] text-center right-[-9px] p-[3px] w-fit h-fit text-[12px] bg-red-500  text-white rounded-full">9+</span>
            </a>*/}
        </span>
        <span className="shrink-0">{isLoading?<Stack direction={"row"}>
            <Avatar alt="" defaultValue={""} />
            <Skeleton sx={skeletonSX} className="m-3" variant="rectangular" width={150} height={"1.5em"} />
        </Stack>:<UserProfile name={storeInfo.name} profileUrl={storeInfo.profile} />}</span>
        </div>
    </div>
}
 
