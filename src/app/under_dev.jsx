import { Box, Stack } from "@mui/material";

export const metadata= {
    title:"Sichu",
    description:"Sichu is an e-commerce platform.Coming soon"
}

const UnderDevelopment = (props) => {
    console.log(props);
    return (<Box className="h-[100%] w-[100%]">
  <Stack direction={'column'} gap={2} justifyContent={'center'} alignItems={'center'}>
  <img alt="fdsa" src="development.png"  className="object-fit"/>
        <h1 className="p-4 m-4 text-green-500 text-lg">Under Development</h1>
  </Stack>
    </Box>);
}
export async function getServerSideProps(context) {
    const data = {a:'a'}
    console.log("HEY");
    // Pass data to the page via props
    return { props: { data } }
  }
 
export default UnderDevelopment;