import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import '../styles/user-style.css'

import FormInput from "../../shared/components/FormElements/FormInput";
import {VALIDATOR_EMAIL, VALIDATOR_PASSWORD, VALIDATOR_RADIO_GROUP} from "../../shared/utils/validators";
import useForm from "../../shared/hooks/place-form-hook";
import {
    EMAIL_FIELD_ID,
    PASSWORD_FIELD_ID,
    PASSWORD_INPUT_TYPE, RADIO_BUTTON_FIELD_ID, RADIO_BUTTON_TYPE,
    SIMPLE_INPUT_TYPE
} from "../../shared/constants/form-fields-constants";
import Box from "@mui/material/Box";
import {Button, CardActions} from "@mui/material";
import {SIGN_UP_ENDPOINT} from "../../shared/constants/endpoint-constants";
import {useHttpClient} from "../../shared/hooks/http-client-hook";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import {AuthenticationContext} from "../../shared/context/AuthenticationContext";
import {useContext} from "react";

const INITIAL_INPUT_DATA = {
    RADIO_BUTTON_FIELD_ID: {
        value: "",
        isValid: false
    },
    EMAIL_FIELD_ID: {
        value: "",
        isValid: false
    },
    PASSWORD_FIELD_ID: {
        value: "",
        isValid: false
    }
}

export default function SignUp() {
    const {doAuthenticate} = useContext(AuthenticationContext);
    const {isLoading, error, sendRequest} = useHttpClient();
    const [formState, inputHandler] = useForm(INITIAL_INPUT_DATA, false)

    async function signUpHandler(event) {
        event.preventDefault()
        if (formState.isValid) {
            try {
                /**@type{{user: User}}*/
                const response = await sendRequest(SIGN_UP_ENDPOINT, 'POST',
                    JSON.stringify({
                        gender: formState.inputs.RADIO_BUTTON_FIELD_ID.value,
                        email: formState.inputs.EMAIL_FIELD_ID.value,
                        password: formState.inputs.PASSWORD_FIELD_ID.value
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
                doAuthenticate(response.user.id, response.user.token);
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <section id="sign-up-section">
            <form id="sign-up-form">
                <Card>
                    <CardContent>
                        <Box noValidate autoComplete="off" id="form-container">
                            <h1>Sign Up</h1>
                            <FormInput
                                id={RADIO_BUTTON_FIELD_ID}
                                name={"gender-radio-buttons-group"}
                                isRequired={true}
                                label="Gender"
                                errorText="Please select an option."
                                inputElementType={RADIO_BUTTON_TYPE}
                                validators={[VALIDATOR_RADIO_GROUP()]}
                                isValid={formState.inputs.RADIO_BUTTON_FIELD_ID.isValid}
                                onInput={inputHandler}
                            />
                            <FormInput
                                id={EMAIL_FIELD_ID}
                                name={"email"}
                                label="Email Address"
                                errorText="Please enter a valid email address."
                                inputElementType={SIMPLE_INPUT_TYPE}
                                validators={[VALIDATOR_EMAIL()]}
                                isValid={formState.inputs.EMAIL_FIELD_ID.isValid}
                                onInput={inputHandler}
                            />
                            <FormInput
                                id={PASSWORD_FIELD_ID}
                                name={"password"}
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
                            onClick={signUpHandler}
                        >
                            Sign Up
                        </Button>
                    </CardActions>
                    {isLoading &&
                        <div style={{display: "flex", justifyContent: "center"}}><CircularProgress/></div>}
                    {error && !isLoading &&
                        <Alert severity="error">Sign up failed. Please check your data and try again. Maybe you already
                            have an account ?!</Alert>}

                </Card>
            </form>
        </section>
    );
}
