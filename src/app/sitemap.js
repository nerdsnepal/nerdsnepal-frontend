import { fetchSichu } from "./www/actions/action"

export default async function  sitemap() {
    const base_url = "http://localhost:3000"
    let others = [] 
try {
   const {data,success}= await fetchSichu({accessToken:null,endPoint:'',revalidate:60})
   if(success){
    data?.products?.map((product)=>{
        others.push({
            url: `${base_url}/product?_id=${product?._id}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
          },)
    })
    data?.categories?.map((category)=>{
        others.push({
            url: `${base_url}/shop-by-series/series?_id=${category?._id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
          },)
    })
   
   }
} catch (error) {
    
}

console.log(others);
    return [
      {
        url: `${base_url}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${base_url}/login`,
        changeFrequency: 'yearly',
        priority: 0.8,
      },
      {
        url: `${base_url}/register`,
        changeFrequency: 'yearly',
        priority: 0.8,
      },
      {
        url: `${base_url}/shop-all`,
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${base_url}/shop-by-series`,
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${base_url}/shop-by-series/series`,
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ...others
    ]
  }