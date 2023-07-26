import Navbar from "./components/navbar"
import AdminToolBar from "./components/toolbar"


const Layout = ({children})=>{
    return <>
    <AdminToolBar/>
    <div className="grid basis-full mobile:my-[90px] my-[65px] grid-cols-1 mobile:grid-cols-2 fixed w-full">
    <Navbar/>
    {children}
    </div>
    </>
}

export default Layout