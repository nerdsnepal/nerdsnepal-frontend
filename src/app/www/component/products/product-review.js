"use client"

import { Box,  Rating, Stack, Typography } from "@mui/material";
import { useSichuFetch } from "../../hooks/use-fetch"
import ReivewList from "./review-list";

function groupCommentsByValue(comments) {
    
    return comments.reduce((grouped, comment) => {
      const value = comment.value;
      if (!grouped[value]) {
        grouped[value] = [];
      }
      grouped[value].push(comment);
      return grouped;
    }, {});
  }
  const RenderRating = ({type,value,total,max})=>{
    
    return <Stack direction={'row'} alignItems={'center'} gap={2}>
          <Rating name="read-only-rating" value={value} readOnly />
          <RatingCountIndicator total={max} value={total} />
          <Typography>{total}</Typography>
    </Stack>
  }
  const RatingCountIndicator=({value,total})=>{
    const percentage = Number.parseInt((value/total)*100);
    return <div className="w-[150px] h-4 bg-slate-300 relative">
            {
                value==0?null:<div className={`w-[${percentage}%] h-4 bg-yellow-500 `}></div>
            }
    </div>
  }
  const TotalRating = ({total,value})=>{
    return <Box>
        <Stack direction={'row'} alignItems={'center'}>
        <Typography variant="h4" fontWeight={'bold'}>{value}</Typography>
        <Typography variant="h4" fontWeight={'bold'} className="text-slate-300">/</Typography>
        <Typography variant="h5" fontWeight={'bold'} className="text-slate-300">5</Typography>
        </Stack>
        <Rating size="large" name="read-only-rating" value={Number(value)} readOnly />
        <Typography>{total>1?`${total} ratings`:`${total} rating`}</Typography>
    </Box>
  }
  const avgRating =(data)=>{
    let total=0;
    let totalReviews = data.length;
    data.map(({value})=>{
        total+=value;
    })
    const avg = total/totalReviews;
    if(isNaN(avg)){return 0;}
    return avg.toFixed(2);
  }
 
const ProductReview=({productId})=>{
    const {data,isLoading} = useSichuFetch({endPoint:`rating?productId=${productId}`,revalidate:20})
    if(isLoading)return null;
    const groupedComments = groupCommentsByValue(data);
    const max = data.length;
    const avg = avgRating(data);
    let ratings = [];
      for (let value = 5; value >= 1; value--) {
        if(groupedComments[value]){
            const total = groupedComments[value].length;
            ratings.push(<RenderRating max={max} key={value} value={value} type={value} total={total} />)
        }else{
            ratings.push(<RenderRating max={max} key={value} value={0} type={value} total={0} />)
        }
      }
    return<Box> <Box className="bg-gray-50 p-4 mt-5">
        <Typography variant="h5" fontWeight={'bold'}>Rating</Typography>
         <Stack direction={{xs:'column',md:'row'}} gap={{xs:2,md:8}} alignItems={{xs:'start',md:'center'}}>
        <TotalRating value={avg} total={max} />
        <Box>
        {
            ...ratings
        }
        </Box>

    </Stack>
    </Box>
    <Box height={50}/>
       <ReivewList data={data}/>

    </Box>
}
export default ProductReview