'use client'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import {  Inbox, Mail, Menu,  PersonOutline, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { AppBar,  Box,  IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText,  Stack, SwipeableDrawer, Toolbar } from "@mui/material";
import Image from "next/image";
import React, { Fragment, useState} from "react";
import { useSelector } from 'react-redux';
import Link from 'next/link';
import SliderCart from './cart/cart';
import UserMenu from './user.menu';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
const Logo = ()=>{
    return <Image alt="" draggable={false} className={`ml-2 h-24 w-24 object-fit overflow-hidden`} src={'/logo.png'} height={65} width={100} unoptimized />
}
const Cart = ({onClick})=>{
    const items = useSelector((state)=>state.cart.items)
    let totalQ =0;
    items.map(({quantity})=>{
        totalQ+=Number(quantity)
    })
    return <IconButton onClick={onClick} aria-label="cart" color='default'>
    <StyledBadge badgeContent={totalQ} color="secondary">
      <ShoppingCartOutlined className='text-white text-2xl' />
    </StyledBadge>
  </IconButton>
}
const Search = ()=>{
    return <IconButton aria-label="cart" color='default'>
      <SearchOutlined className='text-white text-2xl' />
  </IconButton>
}
const pages = ['SHOP ALL', 'SHOP BY SERIES', 'SHOP BY COLLECTION'];
const pagesUrl = ['/shop-all','/shop-by-series','/shop-by-collection']

function SichuAppBar() {
    const user = useSelector((state)=>state.auth.user)
    const [state, setState] = React.useState(false);
    const [cartState,setCartState] = useState(false);
    const togglerCartState = ()=>{
        setCartState((prev)=>!prev);
    }
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
        <Stack className='h-[65px] mobile:h-[65px]'>
          <Toolbar  disableGutters>
            <Link
            href={'/'}
            className='hidden md:block'>
            <Logo/>
            </Link>
           
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
            <Logo/>
            </Link>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }  }} className="ml-4">
              {pages.map((page,index) => (
                <Link
                  key={page}
                  href={pagesUrl[index]}
                    style={{color:'white'}}
                    className='p-2'>
                    {page}
                </Link>
              ))}
            </Box>
            <Stack sx={{ flexGrow: 0 }} direction={'row'} gap={1} position={'absolute'}  justifyContent={'center'} right={'24px'}>
                {user===null?<Link className='flex justify-center items-center' href={'/login'} style={{color:'white'}}>
                    <PersonOutline/>
                    </Link>:  
            <UserMenu user= {user}/>}
           <Link href={'/search'} className='display:flex  items-center content-center' style={{color:'white'}}>
            <Search/>
           </Link>
            <Cart onClick={togglerCartState} />
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
     
        <React.Fragment key={'right'}>
             <SwipeableDrawer
               anchor={'right'}
               open={cartState}
               onClose={togglerCartState}
               onOpen={togglerCartState}>
               <SliderCart onClose={togglerCartState} anchor={'right'}/>
             </SwipeableDrawer>
        </React.Fragment>
        </Fragment>
    );
  }
export default SichuAppBar;