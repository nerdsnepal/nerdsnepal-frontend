
import { APPNAME } from '../lib/utils/utils'
import MainPageSection from './(home)/home/page'

export const metadata= {
    title:APPNAME,
    description:'Sichu is an ecommerce platform',
    keywords:"Sichu,Nepal,Sinchunepal"
}
export default function Home(props) {

  return (<MainPageSection/>)
}
