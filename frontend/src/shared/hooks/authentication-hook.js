import {useState, useCallback, useEffect} from 'react';

let logoutTimer;

export const useAuthentication = () => {
    const [token, setToken] = useState(null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
    const [userId, setUserId] = useState(null);

    const authenticate = useCallback((uid, token, expirationDate = null) => {
        console.log("Authentication");
        setToken(token);
        setUserId(uid);

        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(tokenExpirationDate);

        localStorage.setItem('userData',
            JSON.stringify({
                userId: uid,
                token: token,
                expiration: tokenExpirationDate.toISOString()
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setTokenExpirationDate(null);
        setUserId(null);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            authenticate(storedData.userId, storedData.token, new Date(storedData.expiration));
        }
    }, [authenticate]);

    return {token, authenticate, logout, userId};
};
