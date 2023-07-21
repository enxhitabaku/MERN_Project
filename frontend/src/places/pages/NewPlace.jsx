import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import {Button, CardActions} from '@mui/material'
import {useHistory} from 'react-router-dom';

import FormInput from '../../shared/components/FormElements/FormInput'
import useForm from '../../shared/hooks/place-form-hook'
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_FILE, VALIDATOR_LATITUDE, VALIDATOR_LONGITUDE,
} from '../../shared/utils/validators'
import {
    FILE_UPLOAD_FIELD_ID,
    DESCRIPTION_FIELD_ID,
    LATITUDE_FIELD_ID,
    LONGITUDE_FIELD_ID,
    TITLE_FIELD_ID, FILE_INPUT_TYPE, TEXT_AREA_INPUT_TYPE, SIMPLE_INPUT_TYPE,
} from '../../shared/constants/form-fields-constants'
import {ADD_PLACES_ENDPOINT} from "../../shared/constants/endpoint-constants";
import {useContext} from "react";
import {AuthenticationContext} from "../../shared/context/AuthenticationContext";
import {useHttpClient} from "../../shared/hooks/http-client-hook";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const INITIAL_FORM_SET_UP = {
    FILE_UPLOAD_FIELD_ID: {
        value: '',
        isValid: false,
    },
    TITLE_FIELD_ID: {
        value: '',
        isValid: false,
    },
    DESCRIPTION_FIELD_ID: {
        value: '',
        isValid: false,
    },
    LATITUDE_FIELD_ID: {
        value: '',
        isValid: false,
    },
    LONGITUDE_FIELD_ID: {
        value: '',
        isValid: false,
    }
}
export default function AddPlace() {
    const {user} = useContext(AuthenticationContext);
    const history = useHistory()
    const {isLoading, error, sendRequest} = useHttpClient();
    const [formState, inputHandler] = useForm(INITIAL_FORM_SET_UP, false);

    async function placeSubmitHandler(event) {
        event.preventDefault()
        if (formState.isValid) {
            try {
                const formData = new FormData();
                formData.append('image', formState.inputs.FILE_UPLOAD_FIELD_ID.value);
                formData.append('title', formState.inputs.TITLE_FIELD_ID.value);
                formData.append('description', formState.inputs.DESCRIPTION_FIELD_ID.value);
                formData.append('latitude', formState.inputs.LATITUDE_FIELD_ID.value);
                formData.append('longitude', formState.inputs.LONGITUDE_FIELD_ID.value);
                formData.append('creatorId', user.id);
                await sendRequest(ADD_PLACES_ENDPOINT, 'POST', formData);
                history.push(`${user.id}/places`);
            } catch (err) {
                console.log(err);
            }
        }
    }

    function handleOnDiscard() {
        if (window.confirm("Are you sure to go back and discard your changes ?")) {
            window.history.back();
        }
    }

    return (
        <section id="new-place-section">
            <form id="new-place-form">
                <Card>
                    <CardContent>
                        <Box noValidate autoComplete="off" id="form-container">
                            <FormInput
                                id={FILE_UPLOAD_FIELD_ID}
                                label={"Place Image"}
                                inputElementType={FILE_INPUT_TYPE}
                                isValid={formState?.inputs?.FILE_UPLOAD_FIELD_ID?.isValid}
                                errorText=""
                                validators={[VALIDATOR_FILE()]}
                                onInput={inputHandler}
                            />
                            <FormInput
                                id={TITLE_FIELD_ID}
                                isRequired={true}
                                label={"Title"}
                                inputElementType={SIMPLE_INPUT_TYPE}
                                isValid={formState?.inputs?.TITLE_FIELD_ID?.isValid}
                                errorText="Please enter a valid title."
                                validators={[VALIDATOR_REQUIRE()]}
                                onInput={inputHandler}
                            />
                            <FormInput
                                id={DESCRIPTION_FIELD_ID}
                                isRequired={true}
                                label={"Description"}
                                inputElementType={TEXT_AREA_INPUT_TYPE}
                                isValid={formState?.inputs?.DESCRIPTION_FIELD_ID?.isValid}
                                errorText="Please enter a description."
                                validators={[VALIDATOR_REQUIRE()]}
                                onInput={inputHandler}
                            />
                            <div id="coordinates-fields-container">
                                <FormInput
                                    id={LATITUDE_FIELD_ID}
                                    isRequired={true}
                                    label={"Latitude"}
                                    inputElementType={SIMPLE_INPUT_TYPE}
                                    isValid={formState?.inputs?.LATITUDE_FIELD_ID?.isValid}
                                    errorText="Please enter a valid latitude on the range 39.0 to 42."
                                    validators={[VALIDATOR_LATITUDE()]}
                                    onInput={inputHandler}
                                />
                                <FormInput
                                    id={LONGITUDE_FIELD_ID}
                                    isRequired={true}
                                    label={"Longitude"}
                                    inputElementType={SIMPLE_INPUT_TYPE}
                                    isValid={formState?.inputs?.LONGITUDE_FIELD_ID?.isValid}
                                    errorText="Please enter a valid longitude on the range 19.0 to 21."
                                    validators={[VALIDATOR_LONGITUDE()]}
                                    onInput={inputHandler}
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
                                disabled={!formState.isValid && !isLoading}
                                onClick={placeSubmitHandler}
                            >
                                Save
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                color="error"
                                onClick={handleOnDiscard}
                            >
                                Cancel
                            </Button>
                        </div>
                    </CardActions>
                    {isLoading &&
                        <div style={{display: "flex", justifyContent: "center"}}><CircularProgress/></div>}
                    {error && !isLoading &&
                        <Alert severity="error">New place creation failed. Please try again.</Alert>}

                </Card>
            </form>
        </section>
    )
}
