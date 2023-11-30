import { API_URL } from "@/app/lib/utils/utils";
import Link from "next/link";
import React from "react";
export const CategoryItem = ({ url, name,_id }) => {
    return (
        <Link href={`/shop-by-series/series?_id=${_id}`}>
        <div className={`flex w-[300px] h-[300px] items-center justify-around gap-[27px] p-[8px] relative bg-[#00000066] rounded-[8px]`} style={{ backgroundImage: `url(${API_URL(url)})`, backgroundPosition: '50% 50%', backgroundSize: 'cover' }}>
            <div className="relative w-fit text-white font-bold  whitespace-nowrap">
                {name}
            </div>
        </div>
        </Link>
    );
};