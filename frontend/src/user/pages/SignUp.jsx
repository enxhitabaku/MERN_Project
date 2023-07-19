import * as React from "react";
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

export default function SignUp() {
    const [formState, inputHandler] = useForm(
        {
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
        }, false
    )

    function signUpHandler(event) {
        event.preventDefault()
        console.log(formState.inputs)
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
                    <CardActions style={{display: "flex", justifyContent: "center"}}>
                        <Button
                            type="submit"
                            size="small"
                            variant="contained"
                            disabled={!formState.isValid}
                            onClick={signUpHandler}
                        >
                            Sign Up
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </section>
    );
}
