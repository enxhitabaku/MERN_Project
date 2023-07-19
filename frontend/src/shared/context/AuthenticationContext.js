import {createContext, useState} from "react";

export const AuthenticationContext = createContext({
    onLogIn: () => {
    },
    onLogOut: () => {
    },
    isAuthenticated: false
});

export function AuthenticationContextProvider(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    function onLogIn() {
        setIsAuthenticated(true);
    }

    function onLogOut() {
        setIsAuthenticated(false);
    }

    return (
        <AuthenticationContext.Provider value={{
            onLogIn,
            onLogOut,
            isAuthenticated
        }}>
            {props.children}
        </AuthenticationContext.Provider>
    );
}
