/**
 * @type {NavigationLink[]}
 **/
export const navLinksList = [
    {
        urlPath: '/',
        label: 'Feed',
    },
    {
        urlPath: '/my-places',
        label: 'My Places',
    },
    {
        urlPath: '/add-place',
        label: 'Add Place',
    },
]

/**
 * @type {NavigationLink[]}
 **/
export const settingsList = [
    {
        urlPath: '/profile',
        label: 'Profile',
    },

    {
        urlPath: '/log-out',
        label: 'Log Out',
    },
]

//TODO: Create Component for those navigaion links that should be displayed when the user is not logged in.
/**
 * @type {NavigationLink[]}
 **/
export const authorizationList = [
    {
        urlPath: '/log-in',
        label: 'Log In',
    },

    {
        urlPath: '/sign-up',
        label: 'Sign Up',
    },
]
