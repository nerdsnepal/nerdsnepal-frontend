import Image from "next/image";
import Link from "next/link";
import { API_URL } from "@/app/lib/utils/utils";
const CategoryImage = ({url,name,_id})=>{
    return <Link href={`/shop-by-series/series?_id=${_id}`}>
        <Image draggable={false} loading="lazy" placeholder="blur" blurDataURL={API_URL(url+'?q=20')}  className="w-[300px] h-[200px] object-cover  m-auto hover:w-[302px] hover:h-[202] hover:shadow-xl transition-all rounded-md shadow-sm" src={API_URL(url)} alt={name} quality={80} height={1080} width={1080}/>
    </Link>
}

export default CategoryImage;