import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const auth = getAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSearch = () => {
      navigate('/search');
  };

  const handleFavs = () => {
      navigate('/favs');
  };

  const handleSaved = () => {
    navigate('/saved');
  };

  const handleCompleted = () => {
    navigate('/completed');
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handelLogOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            MySousChef
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              <MenuItem key="1" onClick={handleSearch}>
                <Typography textAlign="center">Search</Typography>
              </MenuItem>
              <MenuItem key="2" onClick={handleFavs}>
                <Typography textAlign="center">Favorites</Typography>
              </MenuItem>
                <MenuItem key="3" onClick={handleSaved}>
                  <Typography textAlign="center">Saved</Typography>
                </MenuItem>
                <MenuItem key="4" onClick={handleCompleted}>
                  <Typography textAlign="center">Completed</Typography>
                </MenuItem>

            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            MySousChef
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleSearch}>
                Search
              </Button>
            
            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleFavs}>
                Favorites
              </Button>
                <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleSaved}>
                  Saved
                </Button>
                <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleCompleted}>
                  Completed
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
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
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="2" onClick={handelLogOut}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
