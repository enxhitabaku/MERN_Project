import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import {Button, CardActions} from '@mui/material'
import {TextField} from '@mui/material'
import {useParams} from 'react-router-dom/cjs/react-router-dom.min'
import Berat from '../../static/images/places/berat.jpg'
import '../styles/user-places-style.css'
import useForm from '../../shared/hooks/place-form-hook'
import {
    DESCRIPTION_FIELD_ID,
    LATITUDE_FIELD_ID,
    LONGITUDE_FIELD_ID,
    TITLE_FIELD_ID,
} from '../../shared/constants/form-fields-constants'
import FormInput from '../../shared/components/FormElements/FormInput'
import {
    TEXT_AREA_INPUT_TYPE,
    SIMPLE_INPUT_TYPE,
} from '../constants/places-constants'
import {VALIDATOR_REQUIRE} from '../../shared/utils/validators'
import CardMedia from "@mui/material/CardMedia";
import * as React from "react";

/**@type {Place[]}*/
const DummyPlaceList = [
    {
        id: '1',
        title: 'Berat View',
        description: 'Nice view.',
        imageSrc: Berat,
        address: 'Berat',
        location: {
            latitude: 41,
            longitude: 20,
        },
        creatorId: '1',
    },
]

export default function EditPlace() {
    const placeId = useParams().placeId
    const identifiedPlace = DummyPlaceList.filter(
        (place) => place.id === placeId
    )[0]

    const [formState, inputHandler] = useForm(
        {
            //Decided that only the description and title can be changed
            TITLE_FIELD_ID: {
                value: identifiedPlace.title,
                isValid: true,
            },
            DESCRIPTION_FIELD_ID: {
                value: identifiedPlace.description,
                isValid: true,
            },
        },
        true
    )

    function placeUpdateSubmitHandler(event) {
        event.preventDefault()
        //BUG HERE
        console.log(formState.inputs)
    }

    if (!identifiedPlace) {
        return (
            <section id="edit-place-section">
                <Alert severity="info">
                    <AlertTitle>No Records Found</AlertTitle>
                    No place records have been found. Please, try again!
                </Alert>
            </section>
        );
    }
    return (
        <section id="edit-place-section">
            <form id="edit-place-form">
                <Card>
                    <CardContent>
                        <Box noValidate autoComplete="off" id="form-container">
                            <CardMedia
                                style={{cursor: "default", maxHeight: "305px"}}
                                component="img"
                                image={identifiedPlace.imageSrc}
                                alt={`Image representing ${identifiedPlace.title}`}
                            />
                            <FormInput
                                id={TITLE_FIELD_ID}
                                inputElementType={SIMPLE_INPUT_TYPE}
                                defaultValue={identifiedPlace.title}
                                errorText="Please enter a valid title."
                                validators={[VALIDATOR_REQUIRE()]}
                                onInput={inputHandler}
                            />
                            <FormInput
                                id={DESCRIPTION_FIELD_ID}
                                inputElementType={TEXT_AREA_INPUT_TYPE}
                                defaultValue={identifiedPlace.description}
                                errorText="Please enter a description."
                                validators={[VALIDATOR_REQUIRE()]}
                                onInput={inputHandler}
                            />
                            <div id="coordinates-fields-container">
                                <TextField
                                    id={LATITUDE_FIELD_ID}
                                    label="Latitude"
                                    defaultValue={
                                        identifiedPlace.location.latitude
                                    }
                                    disabled
                                />
                                <TextField
                                    id={LONGITUDE_FIELD_ID}
                                    label="Longitude"
                                    defaultValue={
                                        identifiedPlace.location.longitude
                                    }
                                    disabled
                                />
                            </div>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <div
                            id="form-action-buttons-container"
                            className="important-action-buttons-container"
                        >
                            <Button
                                type="submit"
                                size="small"
                                variant="contained"
                                disabled={!formState.isValid}
                                onClick={placeUpdateSubmitHandler}
                            >
                                Save
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                color="error"
                            >
                                Discard
                            </Button>
                        </div>
                    </CardActions>
                </Card>
            </form>
        </section>
    )
}
