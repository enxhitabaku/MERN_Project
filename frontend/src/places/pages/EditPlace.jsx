import '../styles/user-places-style.css'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import {Button, CardActions} from '@mui/material'
import {useParams} from 'react-router-dom/cjs/react-router-dom.min'
import CircularProgress from '@mui/material/CircularProgress';
import useForm from '../../shared/hooks/place-form-hook'
import {
    DESCRIPTION_FIELD_ID, SIMPLE_INPUT_TYPE, TEXT_AREA_INPUT_TYPE,
    TITLE_FIELD_ID,
} from '../../shared/constants/form-fields-constants'
import FormInput from '../../shared/components/FormElements/FormInput'
import {VALIDATOR_REQUIRE} from '../../shared/utils/validators'
import {useContext, useEffect, useState} from "react";
import {AuthenticationContext} from "../../shared/context/AuthenticationContext";
import {useHistory} from "react-router-dom";
import {useHttpClient} from "../../shared/hooks/http-client-hook";
import {MODIFY_PLACE_ENDPOINT} from "../../shared/constants/endpoint-constants";

const INITIAL_INPUT_VALUES = {
    TITLE_FIELD_ID: {
        value: '',
        isValid: false
    },
    DESCRIPTION_FIELD_ID: {
        value: '',
        isValid: false
    }
}

export default function EditPlace() {
    const {userId} = useContext(AuthenticationContext);
    const {isLoading, error, sendRequest} = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();
    const history = useHistory();
    const placeId = useParams().placeId;

    const [formState, inputHandler, setFormData] = useForm(INITIAL_INPUT_VALUES, false);

    useEffect(() => {
        async function fetchPlace() {
            try {
                const responseData = await sendRequest(MODIFY_PLACE_ENDPOINT(placeId));
                setLoadedPlace(responseData.place);
                setFormData(
                    {
                        TITLE_FIELD_ID: {
                            value: responseData.place.title,
                            isValid: true
                        },
                        DESCRIPTION_FIELD_ID: {
                            value: responseData.place.description,
                            isValid: true
                        }
                    }, true);

            } catch (err) {
                console.log(err);
            }
        }

        fetchPlace();
    }, [sendRequest, placeId, setFormData]);

    async function placeUpdateSubmitHandler(event) {
        event.preventDefault();
        try {
            await sendRequest(MODIFY_PLACE_ENDPOINT(placeId), 'PATCH',
                JSON.stringify({
                    title: formState.inputs.TITLE_FIELD_ID.value,
                    description: formState.inputs.DESCRIPTION_FIELD_ID.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            history.push(`${userId}/places`);
        } catch (err) {
            console.log(err);
        }
    }

    function placeCancelHandler(event) {
        event.preventDefault()
        history.push(`${userId}/places`);
    }

    if (isLoading) {
        return (
            <section id="edit-place-section" style={{alignContent: "center"}}>
                <CircularProgress/>
            </section>
        );
    }

    if (error) {
        return (
            <section id="edit-place-section">
                <Alert severity="error">No place records have been found, try again later!</Alert>
            </section>
        );
    }

    if (!loadedPlace) {
        return (
            <section id="edit-place-section">
                <Alert severity="info">
                    <AlertTitle>No Records Found</AlertTitle>
                    No place records have been found. Please, add one!
                </Alert>
            </section>
        );
    }

    return (
        <section id="edit-place-section">
            {(!isLoading && loadedPlace) &&
                <form id="edit-place-form">
                    <Card>
                        <CardContent>
                            <Box noValidate autoComplete="off" id="form-container">
                                <FormInput
                                    id={TITLE_FIELD_ID}
                                    isRequired={true}
                                    label="Title"
                                    inputElementType={SIMPLE_INPUT_TYPE}
                                    errorText="Please enter a valid title."
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}
                                    defaultValue={loadedPlace.title}
                                    isValid={formState.inputs.TITLE_FIELD_ID.isValid}
                                />
                                <FormInput
                                    id={DESCRIPTION_FIELD_ID}
                                    isRequired={true}
                                    label="Description"
                                    inputElementType={TEXT_AREA_INPUT_TYPE}
                                    errorText="Please enter a description."
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}
                                    defaultValue={loadedPlace.description}
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
                                    onClick={placeCancelHandler}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </CardActions>
                    </Card>
                </form>
            }
        </section>
    )
}
