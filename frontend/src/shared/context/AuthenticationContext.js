import {createContext} from "react";
import {useAuthentication} from "../hooks/authentication-hook";

export const AuthenticationContext = createContext({
    doAuthenticate: () => {
    },
    onLogOut: () => {
    },
    /**@type{string | null}*/
    token: null,
    /**@type{boolean}*/
    isAuthenticated: false,
    /**@type{string | null}*/
    userId: ""
});

export function AuthenticationContextProvider(props) {
    const {token, authenticate, logout, userId} = useAuthentication();

    return (
        <AuthenticationContext.Provider value={{
            doAuthenticate: authenticate,
            onLogOut: logout,
            token,
            isAuthenticated: !!token,
            userId
        }}>
            {props.children}
        </AuthenticationContext.Provider>
    );
}
