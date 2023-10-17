'use client'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import {  Inbox, Mail, Menu, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Stack, SwipeableDrawer, Toolbar, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import React, { Fragment} from "react";
import { useSelector } from 'react-redux';
import Link from 'next/link';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
const Logo = ({scale=2.5})=>{
    return <Image alt="" draggable={false} className={`h-[70px] w-[100px]  mobile:w-[150px] scale-[${scale}] `} src={'logo.svg'} height={65} width={100} />
}
const Cart = ()=>{
    const items = useSelector((state)=>state.cart.items)
    return <IconButton aria-label="cart" color='default'>
    <StyledBadge badgeContent={items?.length} color="secondary">
      <ShoppingCartOutlined className='text-white text-2xl' />
    </StyledBadge>
  </IconButton>
}
const Search = ()=>{
    return <IconButton aria-label="cart" color='default'>
      <SearchOutlined className='text-white text-2xl' />
  </IconButton>
}
const pages = ['SHOP ALL', 'SHOP BY SERIES', 'SHOP BY BRAND','SALE'];
const pagesUrl = ['/shop-all','/','/','/']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function SichuAppBar() {
  
    const user = useSelector((state)=>state.auth.user)
  
    const [state, setState] = React.useState(false);
      const toggleDrawer =  (event) => {
            setState((prev)=>!prev);
      };
      const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}>
          <List>
            {pages.map((text, index) => (<Link key={text} href={pagesUrl[index]}>
              <ListItem  disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <Inbox /> : <Mail />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      );
    
    return (
        <Fragment>
        <AppBar position="sticky" className='top-0'>
        <Stack maxWidth="xl" className='h-[65px] mobile:h-[65px]'>
          <Toolbar disableGutters>
            <Link  href="/"></Link>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
            <Logo/>
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} alignItems={'center'} >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer}
                color="inherit">
            
              </IconButton>
              <Menu
                id="menu-appbar"
                onClick={toggleDrawer}
                anchororigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}>
              </Menu>
              <Link href="/">
              <Typography
              variant="h6"
              noWrap
              >
            <Logo scale={2.5} />
            </Typography>
            </Link>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page,index) => (
                <Link
                  key={page}
                  href={pagesUrl[index]}
                    style={{color:'white'}}
                    className='p-2'
                  >
                    {page}
                </Link>
              ))}
            </Box>
            <Stack direction={'row'} gap={1.5} position={'absolute'}  justifyContent={'center'} right={'24px'}>
          {user===null?null:  <Box sx={{ flexGrow: 0 }} >
                 <Stack direction={'row'} gap={2} justifyContent={'center'} alignItems={'center'}>
                 <Avatar alt="User profile" className="w-12 h-12 object-fill"  src={user.profile}/>
                  <Typography sx={{display:{xs:'none',md:'block'}}}>{user.fullName}</Typography>
                 </Stack>
            </Box>}
           <Link href={'/search'} className='display:flex  items-center content-center' style={{color:'white'}}>
             <Search/>
           </Link>
            <Cart/>
            </Stack>
           
          </Toolbar>
        </Stack>
      </AppBar>
      <React.Fragment key={'left'}>
          <SwipeableDrawer
            anchor={'left'}
            open={state}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}>
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>

        </Fragment>
    );
  }
export default SichuAppBar;