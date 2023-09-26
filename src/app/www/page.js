
import { APPNAME } from '../lib/utils/utils'
import UnderDevelopment from '../under_dev'

export const metadata= {
    title:APPNAME,
    description:'Sichu is an ecommerce platform',
    keywords:"Sichu,Nepal,Sinchunepal"
}
export const config = {
    runtime: 'nodejs', // or "edge"
  }
   
  
export default function Home(props) {
    console.log(props);
  return (<UnderDevelopment/>
  )
}
