import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import '../styles/user-style.css'

import FormInput from "../../shared/components/FormElements/FormInput";
import {VALIDATOR_EMAIL, VALIDATOR_PASSWORD} from "../../shared/utils/validators";
import useForm from "../../shared/hooks/place-form-hook";
import {
    EMAIL_FIELD_ID,
    PASSWORD_FIELD_ID,
    PASSWORD_INPUT_TYPE,
    SIMPLE_INPUT_TYPE
} from "../../shared/constants/form-fields-constants";
import {LOG_IN_ENDPOINT} from "../../shared/constants/endpoint-constants"
import Box from "@mui/material/Box";
import {Button, CardActions} from "@mui/material";
import {useHttpClient} from "../../shared/hooks/http-client-hook";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import {AuthenticationContext} from "../../shared/context/AuthenticationContext";
import {useContext} from "react";

const INITIAL_INPUT_DATA = {
    EMAIL_FIELD_ID: {
        value: "",
        isValid: false
    },
    PASSWORD_FIELD_ID: {
        value: "",
        isValid: false
    }
}

export default function LogIn() {
    const {doAuthenticate} = useContext(AuthenticationContext);
    const {isLoading, error, sendRequest} = useHttpClient();
    const [formState, inputHandler] = useForm(INITIAL_INPUT_DATA, false);

    async function logInHandler(event) {
        event.preventDefault()
        if (formState.isValid) {
            try {
                /**@type{{user: User}}*/
                const response = await sendRequest(LOG_IN_ENDPOINT, 'POST',
                    JSON.stringify({
                        email: formState.inputs.EMAIL_FIELD_ID.value,
                        password: formState.inputs.PASSWORD_FIELD_ID.value
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
                doAuthenticate(response.user.id, response.user.token);
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <section id="log-in-section">
            <form id="log-in-form">
                <Card>
                    <CardContent>
                        <Box noValidate autoComplete="off" id="form-container">
                            <h1>Authenticate</h1>

                            <FormInput
                                id={EMAIL_FIELD_ID}
                                label="Email Address"
                                errorText="Please enter a valid email address."
                                inputElementType={SIMPLE_INPUT_TYPE}
                                validators={[VALIDATOR_EMAIL()]}
                                isValid={formState.inputs.EMAIL_FIELD_ID.isValid}
                                onInput={inputHandler}
                            />
                            <FormInput
                                id={PASSWORD_FIELD_ID}
                                label="Password"
                                errorText="Please enter a valid password."
                                inputElementType={PASSWORD_INPUT_TYPE}
                                validators={[VALIDATOR_PASSWORD()]}
                                isValid={formState.inputs.PASSWORD_FIELD_ID.isValid}
                                onInput={inputHandler}
                            />
                        </Box>
                    </CardContent>
                    <CardActions className="auth-form-action-buttons-container">
                        <Button
                            type="submit"
                            size="small"
                            variant="contained"
                            disabled={!formState.isValid && !isLoading}
                            onClick={logInHandler}
                        >
                            Log In
                        </Button>
                    </CardActions>
                    {isLoading &&
                        <div style={{display: "flex", justifyContent: "center"}}><CircularProgress/></div>}
                    {error && !isLoading &&
                        <Alert severity="error">Login failed. Please check your credentials and try again.</Alert>}
                </Card>
            </form>
        </section>
    );
}
