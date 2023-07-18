import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import {Button, CardActions} from '@mui/material'
import {useParams} from 'react-router-dom/cjs/react-router-dom.min'
import Berat from '../../static/images/places/berat.jpg'
import '../styles/user-places-style.css'
import CircularProgress from '@mui/material/CircularProgress';
import useForm from '../../shared/hooks/place-form-hook'
import {
    DESCRIPTION_FIELD_ID,
    TITLE_FIELD_ID,
} from '../../shared/constants/form-fields-constants'
import FormInput from '../../shared/components/FormElements/FormInput'
import {
    TEXT_AREA_INPUT_TYPE,
    SIMPLE_INPUT_TYPE,
} from '../constants/places-constants'
import {VALIDATOR_REQUIRE} from '../../shared/utils/validators'
import * as React from "react";
import {useEffect, useState} from "react";

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
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams().placeId;

    const [formState, inputHandler, setFormData] = useForm(
        {
            TITLE_FIELD_ID: {
                value: '',
                isValid: false
            },
            DESCRIPTION_FIELD_ID: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const identifiedPlace = DummyPlaceList.find(p => p.id === placeId);

    useEffect(() => {
        if (identifiedPlace) {
            setFormData(
                {
                    TITLE_FIELD_ID: {
                        value: identifiedPlace.title,
                        isValid: true
                    },
                    DESCRIPTION_FIELD_ID: {
                        value: identifiedPlace.description,
                        isValid: true
                    }
                },
                true
            );
        }
        setIsLoading(false);
    }, [setFormData, identifiedPlace]);

    function placeUpdateSubmitHandler(event) {
        event.preventDefault()
        console.log(formState.inputs)
    }

    if (isLoading) {
        return (
            <section id="edit-place-section">
                <CircularProgress/>
            </section>
        );
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
                            <FormInput
                                id={TITLE_FIELD_ID}
                                inputElementType={SIMPLE_INPUT_TYPE}
                                errorText="Please enter a valid title."
                                validators={[VALIDATOR_REQUIRE()]}
                                onInput={inputHandler}
                                defaultValue={formState.inputs.TITLE_FIELD_ID.value}
                                isValid={formState.inputs.TITLE_FIELD_ID.isValid}
                            />
                            <FormInput
                                id={DESCRIPTION_FIELD_ID}
                                inputElementType={TEXT_AREA_INPUT_TYPE}
                                errorText="Please enter a description."
                                validators={[VALIDATOR_REQUIRE()]}
                                onInput={inputHandler}
                                defaultValue={formState.inputs.DESCRIPTION_FIELD_ID.value}
                                isValid={formState.inputs.DESCRIPTION_FIELD_ID.isValid}
                            />
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
