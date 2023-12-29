'use client';
import Image from "next/image";
import { useSelector } from "react-redux";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { API_URL } from "@/app/lib/utils/utils";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

const ProductSlider = ({products}) => {
    return (<>
           <Swiper 
           navigation={true}
            className="product-swiper w-full relative h-[400px] mobile:h-[560px]"
           modules={[Navigation, Pagination, A11y]}
           pagination={{ clickable: true }}>
                {
                    products?.slice(0,5).map((product,index)=>{
                        const url =  product.mediaUrls[0] 
                        const name = product.name
                        return <SwiperSlide key={index} className="relative shadow-md z-0" >
                                <div className=" h-[400px] mobile:h-[800px]">
                                <Image draggable={false} alt={name}  placeholder="blur" blurDataURL={API_URL(url+'?q=20')} loading="lazy" width={1080} height={1080}  src={API_URL(url)} className="w-screen h-full object-cover z-0"/>
                            <div className="absolute w-screen z-10 p-3 bottom-[20%] text-white">
                                <Stack className="relative" direction={'column'} gap={1.5} justifyContent={'center'} alignItems={'center'}>
                                <Typography variant="h5"  >{product.category.name}</Typography>
                                <Typography variant="h5"  >{name}</Typography>
                                <Link href={`product?_id=${product._id}`}>
                                    <Button variant="contained" className="bg-slate-100 text-black w-fit font-Poppins hover:bg-blue-500 hover:text-white hover:font-bold transition-all">SHOP NOW</Button>
                                </Link>
                                </Stack>
                                </div>
                            </div>
                      </SwiperSlide>
                    })
                }
          </Swiper>
    </>
    );
}
 
export default ProductSlider;