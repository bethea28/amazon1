import React, { useState, MouseEvent } from 'react';
import { AppBar, Container, Button, Grid } from '@mui/material';
import { Box, Toolbar, Menu, useTheme } from '@mui/material';
import { IconButton, Typography, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

const AppbarPublic = () => {

  const pages = ['Login', 'signup'];

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();

  const handlePageClick = (key: string) => {
    navigate(`/${key}`);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#335436" }}>
      <Container maxWidth={false}>
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
                    color="white" sx={{ my: 2, display: 'block' }}>
                    {page}
                  </Button>))}
              </Box>
            </Grid>
            <Grid item>
              <Button color='white' onClick={() => handlePageClick('')}>
                <Typography fontStyle={'inherit'}>
                  JUMPSTARTER
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Box sx={{ flexGrow: 0 }}>
                <Button sx={{ backgroundColor: "#A6BBA7", color: "#000000", borderRadius: 50 }}
                  variant="contained" size="small" onClick={() => handlePageClick('addproject')}>Start a project</Button>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppbarPublic;
