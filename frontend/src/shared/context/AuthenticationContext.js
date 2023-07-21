import {createContext, useState} from "react";

export const AuthenticationContext = createContext({
    doAuthenticate: () => {
    },
    onLogOut: () => {
    },
    /**@type{boolean}*/
    isAuthenticated: false,
    /**@type{string}*/
    userId: ""
});

export function AuthenticationContextProvider(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState("");

    /**@param{string} userId*/
    function authenticate(userId) {
        setUserId(userId);
        setIsAuthenticated(true);
    }

    function onLogOut() {
        setUserId("");
        setIsAuthenticated(false);
    }

    return (
        <AuthenticationContext.Provider value={{
            doAuthenticate: authenticate,
            onLogOut,
            isAuthenticated,
            userId
        }}>
            {props.children}
        </AuthenticationContext.Provider>
    );
}
