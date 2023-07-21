import * as React from 'react'
import {Link} from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {Button, CardActions} from '@mui/material'
import '../styles/user-places-style.css'
import {useContext} from "react";
import {AuthenticationContext} from "../../shared/context/AuthenticationContext";
import {MODIFY_PLACE_ENDPOINT} from "../../shared/constants/endpoint-constants";
import {useHttpClient} from "../../shared/hooks/http-client-hook";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

/**
 * React functional component to render a place entity within a Card.
 * @component
 * @param {{place: Place, onDelete: Function}} props
 * @returns {JSX.Element}
 * */
export default function PlaceItem({place, onDelete}) {
    const {isAuthenticated, user} = useContext(AuthenticationContext);
    const {isLoading, error, sendRequest} = useHttpClient();

    function handleOnOpenGoogleMapClick() {
        window.open(
            `http://maps.google.com/?q=${place.location.latitude},${place.location.longitude}`,
            '_blank'
        )
    }

    async function handleOnDelete() {
        if (window.confirm("Are you sure to delete this place ?")) {
            try {
                await sendRequest(MODIFY_PLACE_ENDPOINT(place.id), 'DELETE');
                onDelete(place.id);
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <li className="place-list-item">
            <Card>
                <CardMedia
                    className="place-list-item-image"
                    component="img"
                    image={place.imageSrc}
                    alt={`Image rapresenting ${place.title}`}
                />
                <CardContent className="place-list-item-content">
                    <Typography gutterBottom variant="h5" component="div">
                        {place.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {place.description}
                    </Typography>
                </CardContent>
                <CardActions className="place-card-action-buttons-container">
                    <Button
                        size="small"
                        color="success"
                        onClick={handleOnOpenGoogleMapClick}
                    >
                        Open on Google Map
                    </Button>
                    {(isAuthenticated && user.id === place.creatorId) &&
                        <div className="important-action-buttons-container">
                            <Link to={`/place/${place.id}`} exact={'true'}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="warning"
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button size="small" variant="contained" color="error" onClick={handleOnDelete}>
                                Delete
                            </Button>
                        </div>
                    }
                </CardActions>
                {isLoading &&
                    <div style={{display: "flex", justifyContent: "center"}}><CircularProgress/></div>}
                {error && !isLoading &&
                    <Alert severity="error">Delete operation failed. Please try again.</Alert>}
            </Card>
        </li>
    )
}
