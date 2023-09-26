'use client'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import {  Inbox, Mail, Menu, ShoppingCartOutlined } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Stack, SwipeableDrawer, Toolbar, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import React, { Fragment} from "react";
import { useSelector } from 'react-redux';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
const Logo = ()=>{
    return <Image alt=""  src={'logo.svg'} height={100} width={100} />
}
const Cart = ()=>{
    return <IconButton aria-label="cart" color='default'>
    <StyledBadge badgeContent={4} color="secondary">
      <ShoppingCartOutlined className='text-white text-2xl' />
    </StyledBadge>
  </IconButton>
}
const pages = ['SHOP ALL', 'SHOP BY SERIES', 'SHOP BY BRAND','SALE'];
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
            {pages.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <Inbox /> : <Mail />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      );
    
    return (
        <Fragment>
        <AppBar position="static">
        <Stack maxWidth="xl" height={60}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
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
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Stack direction={'row'} gap={3} position={'absolute'} right={'24px'}>
          {user===null?null:  <Box sx={{ flexGrow: 0 }} >
              <Tooltip title="Open settings">
                <IconButton  sx={{ p: 0 }}>
                  <Avatar alt="User profile" className="w-12 h-12 object-fill"  src={user.profile}/>
                </IconButton>
              </Tooltip>
            </Box>}
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