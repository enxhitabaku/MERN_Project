import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import '../styles/user-style.css'

import FormInput from "../../shared/components/FormElements/FormInput";
import {VALIDATOR_EMAIL} from "../../shared/utils/validators";
import useForm from "../../shared/hooks/place-form-hook";
import {EMAIL_FIELD_ID, SIMPLE_INPUT_TYPE} from "../../shared/constants/form-fields-constants";

export default function LogIn() {
    const [formState, inputHandler] = useForm(
        {
            EMAIL_FIELD_ID: {
                value: "",
                isValid: false
            }
        }, false
    )
    return (
        <section id="log-in-section">
            <Card>
                <CardContent>
                    <h1>Authenticate</h1>
                    <form id="log-in-form">
                        <FormInput
                            id={EMAIL_FIELD_ID}
                            label="Email Address"
                            defaultValue=""
                            errorText="Please enter a valid email address."
                            inputElementType={SIMPLE_INPUT_TYPE}
                            validators={[VALIDATOR_EMAIL()]}
                            isValid={true}
                            onInput={inputHandler}
                        />
                    </form>
                </CardContent>
            </Card>
        </section>
    );
}
