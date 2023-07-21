import {Link} from 'react-router-dom'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

import {
    authorizationLinksList
} from '../../constants/navigation-bar-constants'
import {AuthenticationContext} from "../../context/AuthenticationContext";
import {useContext} from "react";

export function NavigationLinks({onClick, mobileView}) {
    const {user} = useContext(AuthenticationContext);
    const navLinksList = [
        {
            urlPath: '/',
            label: 'Feed',
        },
        {
            urlPath: `/${user.id}/places`,
            label: 'My Places',
        },
        {
            urlPath: '/add-place',
            label: 'Add Place',
        }
    ]

    if (mobileView) {
        return (
            <>
                <Link key={1} to={navLinksList[0].urlPath}>
                    <Button key={1} onClick={onClick}
                            sx={{
                                my: 2,
                                color: 'white',
                                display: 'block',
                            }}>
                        {navLinksList[0].label}
                    </Button>
                </Link>
                <Link key={2} to={navLinksList[1].urlPath}>
                    <Button key={1} onClick={onClick}
                            sx={{
                                my: 2,
                                color: 'white',
                                display: 'block',
                            }}>
                        {navLinksList[1].label}
                    </Button>
                </Link>
                <Link key={3} to={navLinksList[2].urlPath}>
                    <Button key={2} onClick={onClick}
                            sx={{
                                my: 2,
                                color: 'white',
                                display: 'block',
                            }}>
                        {navLinksList[2].label}
                    </Button>
                </Link>
            </>
        )
    }

    return (
        <>
            <Link key={1} to={navLinksList[0].urlPath}>
                <MenuItem key="my places" onClick={onClick}>
                    <Typography textAlign="center">
                        {navLinksList[0].label}
                    </Typography>
                </MenuItem>
            </Link>
            <Link key={2} to={navLinksList[1].urlPath}>
                <MenuItem key="my places" onClick={onClick}>
                    <Typography textAlign="center">
                        {navLinksList[1].label}
                    </Typography>
                </MenuItem>
            </Link>
            <Link key={3} to={navLinksList[2].urlPath}>
                <MenuItem key="my places" onClick={onClick}>
                    <Typography textAlign="center">
                        {navLinksList[2].label}
                    </Typography>
                </MenuItem>
            </Link>
        </>
    )
}

export function AuthorizationLinks({onClick}) {
    return (
        <div style={{display: "flex", gap: "15px"}} id="authorization-links">
            {authorizationLinksList.map((auth) => (
                <Link key={auth.label} to={auth.urlPath}>
                    <Button
                        variant="outlined"
                        key={auth.label}
                        onClick={onClick}
                    >
                        {auth.label}
                    </Button>
                </Link>
            ))}
        </div>
    )
}
