import UsersList from '../components/UsersList'
import {useHttpClient} from "../../shared/hooks/http-client-hook";
import {useEffect, useState} from "react";
import {ALL_USERS_ENDPOINT} from "../../shared/constants/endpoint-constants";
import CircularProgress from "@mui/material/CircularProgress";

export default function Users() {
    const {isLoading, sendRequest} = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const responseData = await sendRequest(ALL_USERS_ENDPOINT);
                setLoadedUsers(responseData.users);
            } catch (err) {
                console.log(err);
            }
        }

        fetchUsers();
    }, [sendRequest]);

    return (
        <>
            {isLoading && <div style={{display: "flex", justifyContent: "center"}}><CircularProgress/></div>}
            {(!isLoading && loadedUsers) && <UsersList users={loadedUsers}/>}
        </>
    )
}
