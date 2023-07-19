import {Link} from 'react-router-dom'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

import {
    authorizationLinksList,
    navLinksList
} from '../../constants/navigation-bar-constants'

export function NavigationLinks({onClick}) {
    return (
        <>
            {navLinksList.map((navLink) => (
                <Link key={navLink.label} to={navLink.urlPath}>
                    <MenuItem key={navLink.label} onClick={onClick}>
                        <Typography textAlign="center">
                            {navLink.label}
                        </Typography>
                    </MenuItem>
                </Link>
            ))}
        </>
    )
}

export function ResponsiveNavigationLinks({onClick}) {
    return (
        <>
            {navLinksList.map((navLink) => (
                <Link key={navLink.label} to={navLink.urlPath}>
                    <Button
                        key={navLink.label}
                        onClick={onClick}
                        sx={{
                            my: 2,
                            color: 'white',
                            display: 'block',
                        }}
                    >
                        {navLink.label}
                    </Button>
                </Link>
            ))}
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
