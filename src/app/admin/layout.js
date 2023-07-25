
import Navbar from "./components/navbar"
import AdminToolBar from "./components/toolbar"
import Loading from "../loading"

const Layout = ({children})=>{
    return <>

   <AdminToolBar/>
    <div className="grid basis-full my-12 grid-cols-2 fixed w-full">
        <Navbar/>
        {children}
    </div>
    </>
}

export default Layout