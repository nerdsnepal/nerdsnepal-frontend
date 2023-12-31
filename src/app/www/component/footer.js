'use client'
import { Facebook, Instagram } from "@mui/icons-material";
import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";

const AboutPlatformOrShop = ({logo="logo.svg",name,description})=>{
    return <div>
       <Stack direction={'row'} justifyContent={'start'} alignItems={'center'} >
        {/*<Image src={logo} alt={name} height={48} width={60} className="select-none object-cover" />*/}
         <Typography variant="h5" fontWeight={'bold'}>{name}</Typography>
       </Stack>
        <Typography variant="body1" >{description}</Typography>
    </div>
}
const QuickLinks = ({name,links})=>{
    return <Box>
        <Typography variant="subtitle1">{name}</Typography>
        <Stack>
        {
            links.map(({url,name},index)=>{
               return <Link href={url} key={index}>{name}</Link>
            })
        }
        </Stack>
    </Box>
}
const SocialMedia = ({socialMedia=[]})=>{

    return <Box>
        <Typography variant="subtitle1">FOLLOW US</Typography>
        <Stack direction={'row'} gap={2}>
            {
                socialMedia?.map(({icon,url},index)=>{
                    return <a key={index} href={url} target="_blank">{icon}</a>
                })
            }

        </Stack>
    </Box>

}
const Contact = ({})=>{
    return <Box>
    <Typography variant="subtitle1">CONTACT</Typography>
    <Stack gap={1} direction={'column'}>
        <Typography variant="body1"><b>Address </b>Bhimsenmarga, Banepa Bazar, Nepal</Typography>
        <Typography variant="body1"><b>Phone </b>985-1006444</Typography>
    </Stack>

    </Box>
}
const Subscribe = ()=>{

    return <Box>
        <Typography variant="subtitle1">SUBSCRIBE NEWSLETTER</Typography>
        <form className="space-y-1">
            <TextField type="email" size="small" name="email" id="email" fullWidth placeholder="Enter your email address" required/>
            <div></div>
            <Button variant="contained"  size="small" fullWidth className="bg-blue-500 capitalize" >Subscribe</Button>
        </form>
    </Box>
}

const Footer = () => {
    const quickLinks = [
        // {url:'/account',name:'My Account'},
        {url:'/shop-by-series',name:'Shop By Series'},
        {url:'/shop-by-collection',name:'Shop by Collection'},
        {url:'/shop-all',name:'Shop all'},
    ]
    const customerServiceLinks = [
        {url:'/',name:'ABC'},
        {url:'/abc',name:'Q'}
    ]
    const socialMedia = [
        {
            icon:<Facebook/>,
            url:"https://facebook.com/sichu.nepal"
        },  
        {
            icon:<Instagram/>,
            url:"https://www.instagram.com/sichu.nepal"
        }
    ]
    const year = new Date().getFullYear()

    return (<div className="relative bg-gray-200 h-fit dark:text-black" >
        <Stack  direction={{ xs: 'column', sm: 'row' }} gap={3} justifyContent={'space-evenly'} className="relative  min-h-[250px] h-fit w-full  p-4 top-0">
           <Stack direction={'column'} gap={3} className="mobile:max-w-[25%]"> 
           <AboutPlatformOrShop name={'Si chu'} description={`Welcome to Sichu Nepal. We offer today's trendiest products, exceptional selection of Marvel, Anime, DC, Disney, and many more.`} />   
           <Contact/>
           </Stack>
            <QuickLinks name={'QUICK LINKS'} links={quickLinks} key={'Quick link'} />
            <QuickLinks name={'CUSTOMER SERVICE'} links={customerServiceLinks} key={'Customer Service'} />
            <Stack gap={3}  direction={'column'}>
            <SocialMedia socialMedia={socialMedia}/>
            {/* <Subscribe/> */}
            </Stack>
        </Stack>
      <div className="ml-[8%] mr-[8%] space-y-2">
      <Divider/>
        <Typography variant="subtitle2">
            &copy; Sichu Nepal {year}
        </Typography>
        <div className="h-5"></div>
      </div>
    </div>);
}
export default Footer;