import React, { useState, MouseEvent, useContext } from 'react';
import { AppBar, Container, Button, Grid } from '@mui/material';
import { Box, Toolbar, Menu, Tooltip } from '@mui/material';
import { IconButton, Typography, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { typographyTitle } from '../../Resources/Constants';

const AppbarPublic = () => {

  const pages = ['Login','signup'];
  const settings = ['Projects'];

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  
  const handleStartProject= () => {
    navigate("/addproject");
  };

  const handlePageClick = (key:string) => {
    navigate(`/${key}`);
  };

  return (
    <AppBar position="static" sx={{bgcolor:"#335436"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
               <MenuIcon />
             </IconButton>
             <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}>
              {pages.map((page) => (
                <MenuItem key={page} 
                onClick={() => handlePageClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
             </Menu>
             </Box>
             <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
             {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
            </Grid>
            <Grid item>
           
              <Typography fontStyle={'inherit'} fontFamily={'Frankfurter'}>
            JUMPSTARTER
            {/* <a href="https://fontmeme.com/kickstarter-font/">
              <img src="https://fontmeme.com/permalink/220825/3ede24c0f4a0bb770dad0532d4833896.png" alt="kickstarter-font"></img>
              </a> */}
           </Typography>
           
           
            </Grid>
            <Grid item>
            <Box sx={{ flexGrow: 0 }}>
              <Button sx={{backgroundColor:"#A6BBA7", color:"#000000", borderRadius:50}} 
              variant="contained" size="small" onClick={handleStartProject}>Start a project</Button>
          </Box> 
            </Grid>
          </Grid>
           {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
               size="large"
               aria-label="account of current user"
               aria-controls="menu-appbar"
               aria-haspopup="true"
               onClick={handleOpenNavMenu}
               color="inherit"
             >
               <MenuIcon />
             </IconButton>
             <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} 
                onClick={() => handlePageClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
             </Menu>
           </Box>
           <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{...typographyTitle}}
          >
            JUMPSTARTER
           </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
             {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
              <Button sx={{backgroundColor:"#A6BBA7", color:"#000000", borderRadius:50}} 
              variant="contained" size="small" onClick={handleStartProject}>Start a project</Button>
          </Box> */}
          
        </Toolbar> 
      </Container> 
    </AppBar>
  );
};
export default AppbarPublic;
