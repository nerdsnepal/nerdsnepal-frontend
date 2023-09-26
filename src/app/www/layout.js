
import SichuAppBar from './component/navbar';
import './globals.css'
import SessionProvider from './session-provider';
export const metadata= {
    "theme-color":"white"
}

const Layout = ({children}) => {
    return (<>
    <SessionProvider/>
    <SichuAppBar/>
        {children}
    </>);
}
 
export default Layout;