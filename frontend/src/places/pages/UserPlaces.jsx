import {useEffect, useState} from "react";
import {useHttpClient} from "../../shared/hooks/http-client-hook";
import PlaceList from '../components/PlaceList'
import {USER_PLACES_ENDPOINT} from "../../shared/constants/endpoint-constants";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import {useParams} from "react-router-dom";


export default function UserPlaces() {
    const {isLoading, error, sendRequest} = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState();

    const userId = useParams().userId;

    useEffect(() => {
        async function fetchUserPlaces() {
            try {
                const responseData = await sendRequest(USER_PLACES_ENDPOINT(userId));
                setLoadedPlaces(responseData.places);
            } catch (err) {
                console.log(err);
            }
        }

        fetchUserPlaces();
    }, [sendRequest, userId]);

    function placeDeletedHandler(deletedPlaceId) {
        setLoadedPlaces((prevPlaces) =>
            prevPlaces.filter(place => place.id !== deletedPlaceId)
        );
    }

    if (!isLoading && error) {
        return (
            <>
                <Alert severity="error">
                    Not able to fetch your places. Please, try again later.
                </Alert>
            </>
        );
    }

    return (
        <>{isLoading && <div style={{display: "flex", justifyContent: "center"}}><CircularProgress/></div>}
            {(!isLoading && loadedPlaces) && <PlaceList places={loadedPlaces} onPlaceDelete={placeDeletedHandler}/>}
        </>
    )
}
