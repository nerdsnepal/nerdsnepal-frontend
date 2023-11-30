import { LogoutOutlined, Person } from "@mui/icons-material";
import { Avatar, Box,  Menu, MenuItem, Stack, Typography } from "@mui/material";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useState } from "react";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { logout } from "@/app/state/reducer/authSlice";
import Link from "next/link";
const settings = [
    {label:'Manage My Account',icon:<Person/>,url:'/account'},
 {label:'My Orders',
 url:'/account/orders',
 icon:<ShoppingBagOutlinedIcon/>}, 
{label:'Logout',icon:<LogoutOutlined/>,url:'/'}];
const UserMenu = ({user}) => {
    const [anchorElUser, setAnchorElUser] = useState(null);    
    const dispatch = useDispatch()
      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
      const handleClickMenu = (value)=>{
      
        if(value==="Logout"){
            signOut().then(()=>{
                dispatch(logout())
            })
           
        }
        handleCloseUserMenu()
      }
    return (<>
    <Stack onClick={handleOpenUserMenu} className="hover:bg-blue-700 cursor-pointer rounded-md mx-2  p-1"  direction={'row'} gap={2} justifyContent={'center'} alignItems={'center'}>
        <Avatar alt="User profile" className="w-9 h-9 object-fill"  src={user.profile}/>
        <Stack direction={'row'} gap={1} justifyContent={'center'} alignItems={'center'} sx={{display:{xs:'none',md:'flex'}}}>
            <Box>
            <Typography variant="body2" fontSize={'11px'} >Hi, {user.fullName}</Typography>
            <Typography>My account</Typography>
            </Box>
            <KeyboardArrowDownOutlinedIcon/>
        </Stack>
    </Stack>
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}>
      {settings.map(({label,icon,url},index) => (
      <Link key={index} href={url}>
        <MenuItem className="space-x-2"  name={label} onClick={(e)=>handleClickMenu(label)}>
            {icon}
          <Typography textAlign="center">{label}</Typography>
        </MenuItem>
      </Link>
      ))}
    </Menu>
    </>);
}

export default UserMenu;