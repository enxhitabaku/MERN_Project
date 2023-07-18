import * as React from 'react'
import {Link} from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {Button, CardActions} from '@mui/material'
import '../styles/user-places-style.css'

/**
 * React functional component to render a place entity within a Card.
 * @component
 * @param {{place: Place}} place
 * @returns {JSX.Element}
 * */
export default function PlaceItem({place}) {
    function handleOnOpenGoogleMapClick() {
        window.open(
            `http://maps.google.com/?q=${place.location.latitude},${place.location.longitude}`,
            '_blank'
        )
    }

    function handleOnDelete() {
        if (window.confirm("Are you sure to delete this place ?")) {
            // DO Delete
            console.log("DELETING..");
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
                </CardActions>
            </Card>
        </li>
    )
}
