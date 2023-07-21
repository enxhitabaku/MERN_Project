import {useContext, useState, useEffect} from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'

import AppLogo from './AppLogo'
import {
    NavigationLinks, AuthorizationLinks,
} from './NavigationLinks'

import '../../styles/navigation-bar.css'
import {AuthenticationContext} from "../../context/AuthenticationContext";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import MaleAvatar from "../../../static/images/avatar/avatar-boy.png";
import FemaleAvatar from "../../../static/images/avatar/avatar-girl.png";
import {useHttpClient} from "../../hooks/http-client-hook";
import {USER_ENDPOINT} from "../../constants/endpoint-constants";

const INITAL_USER = {
    id: "",
    email: "",
    gender: "",
    places: []
}

/**
 * Functional Component to render the Navigation Bar
 * @component
 * @returns {JSX.Element}
 **/
export default function NavigationBar() {
    const {isAuthenticated, userId, onLogOut} = useContext(AuthenticationContext);
    const {isLoading, error, sendRequest} = useHttpClient();
    const [user, setUser] = useState(INITAL_USER);

    useEffect(() => {
        if (isAuthenticated) {
            async function fetchUser() {
                try {
                    const responseData = await sendRequest(USER_ENDPOINT, "POST", {
                        userId: userId
                    });
                    setUser(responseData.user);
                } catch (err) {
                    console.log(err);
                }
            }

            fetchUser();
        }
    }, [sendRequest, isAuthenticated]);

    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleLogOutClick = () => {
        onLogOut()
    }

    return (
        <AppBar position="static" className="navigation-bar">
            <Container maxWidth="xl">
                <Toolbar style={{display: "flex", justifyContent: "space-between"}} disableGutters>
                    <AppLogo/>
                    {isAuthenticated &&
                        <>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: {xs: 'flex', md: 'none'},
                                }}
                            >
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon/>
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
                                        display: {xs: 'block', md: 'none'},
                                    }}
                                >
                                    <NavigationLinks onClick={handleCloseNavMenu} mobileView={false}/>
                                </Menu>
                            </Box>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: {xs: 'none', md: 'flex'},
                                }}
                            >
                                <NavigationLinks onClick={handleCloseNavMenu} mobileView={true}/>
                            </Box>
                        </>
                    }

                    <Box sx={{flexGrow: 0}}>
                        {
                            !isAuthenticated ? <AuthorizationLinks/> :
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton
                                            onClick={handleOpenUserMenu}
                                            sx={{p: 0}}
                                        >
                                            <Avatar
                                                alt={(isLoading || error) ? "" : user?.email}
                                                src={(isLoading || error) ? "" : user?.gender === "male" ? MaleAvatar : FemaleAvatar}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{mt: '45px'}}
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
                                        <MenuItem onClick={handleLogOutClick}>
                                            <Typography textAlign="center">
                                                Log Out
                                            </Typography>
                                        </MenuItem>
                                    </Menu>
                                </>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
