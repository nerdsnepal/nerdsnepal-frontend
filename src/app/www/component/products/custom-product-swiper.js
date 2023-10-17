
import { API_URL } from "@/app/lib/utils/utils";
import { ExpandCircleDownOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import Image from "next/image";
import { useRef, useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination,A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const CustomProductSlider = ({product}) => {
    const swiperRef = useRef()
    const [activeIndex,setIndex] = useState(0)
    const onActiveIndexChange = (swiper)=>{
        setIndex(swiper.activeIndex);
    }
    const VerticalList = ()=>{
        const handleClick = (index)=>{
        //  
        }
        return  <Stack height={500}  className="overflow-auto hidden mobile:flex" justifyContent={'start'} width={130} gap={2.5}> {
                 product?.mediaUrls.map((url,index)=>{
                    const name = product?.name   
                    const border = activeIndex==index?'border-2 border-black shadow-sm':'border-0'
                    return  <Image key={index} onClick={handleClick} draggable={false} alt={name}  placeholder="blur" blurDataURL={API_URL(url+'?q=10')}
                    loading="lazy" width={1080} height={1080}  src={API_URL(url)}
                     className={`w-[123px] cursor-pointer p-1 h-[108px] object-cover z-0 ${border}`}/>
                 }) 
            }
        </Stack>
    }
  

    return (<Stack direction={{xs:'column',md:'row'}} gap={2}> 
    <VerticalList/>
     <Swiper 
        ref={swiperRef}
           navigation={true}
           onActiveIndexChange={onActiveIndexChange}
            className="custom-swiper w-screen mobile:w-[500px] h-[400px] mobile:h-[500px]"
           modules={[Navigation, Pagination, A11y]}
           pagination={{ clickable: true }}>
                {
                    product?.mediaUrls.map((url,index)=>{
                        const name = product.name
                        return <SwiperSlide key={index} className="relative shadow-md z-0" >
                            <Image draggable={false} alt={name}  placeholder="blur" blurDataURL={API_URL(url+'?q=10')}
                             loading="lazy" width={1080} height={1080}  src={API_URL(url)}
                              className="w-full mobile:w-fit h-full object-cover z-0"/>
                            </SwiperSlide>
                    })
                }
  
          </Swiper>
    
    </Stack>);
}
 
export default CustomProductSlider;