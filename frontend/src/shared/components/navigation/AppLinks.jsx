import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

import {
    navLinksList,
    settingsList,
} from '../../constants/navigation-bar-constants'

export function NavigationLinks({ onClick }) {
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

export function ResponsiveNavigationLinks({ onClick }) {
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

export function SettingsLinks({ onClick }) {
    return (
        <>
            {settingsList.map((setting) => (
                <Link key={setting.label} to={setting.urlPath}>
                    <MenuItem key={setting.id} onClick={onClick}>
                        <Typography textAlign="center">
                            {setting.label}
                        </Typography>
                    </MenuItem>
                </Link>
            ))}
        </>
    )
}