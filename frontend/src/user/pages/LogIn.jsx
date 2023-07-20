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
import Box from "@mui/material/Box";
import {Button, CardActions} from "@mui/material";
import {useContext} from "react";
import {AuthenticationContext} from "../../shared/context/AuthenticationContext";

export default function LogIn() {
    const {onLogIn} = useContext(AuthenticationContext);
    const [formState, inputHandler] = useForm(
        {
            EMAIL_FIELD_ID: {
                value: "",
                isValid: false
            },
            PASSWORD_FIELD_ID: {
                value: "",
                isValid: false
            }
        }, false
    )

    function logInHandler(event) {
        event.preventDefault()
        console.log(formState.inputs)
        if (formState.isValid) {
            onLogIn()
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
                            disabled={!formState.isValid}
                            onClick={logInHandler}
                        >
                            Log in
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </section>
    );
}
