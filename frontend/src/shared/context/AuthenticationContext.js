import {createContext, useState} from "react";

/**@type{User}*/
const INITIAL_USER_ENTITY = {
    id: "",
    email: "",
    gender: "",
    /**@type{Place[]}*/
    places: []
}

export const AuthenticationContext = createContext({
    doAuthenticate: () => {
    },
    onLogOut: () => {
    },
    /**@type{boolean}*/
    isAuthenticated: false,
    /**@type{User}*/
    user: INITIAL_USER_ENTITY
});

export function AuthenticationContextProvider(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(undefined);

    /**@param{User} user*/
    function authenticate(user) {
        setUser(user);
        setIsAuthenticated(true);
    }

    function onLogOut() {
        setUser(INITIAL_USER_ENTITY);
        setIsAuthenticated(false);
    }

    return (
        <AuthenticationContext.Provider value={{
            doAuthenticate: authenticate,
            onLogOut,
            isAuthenticated,
            user
        }}>
            {props.children}
        </AuthenticationContext.Provider>
    );
}
