import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import { Button, CardActions } from '@mui/material'

import FormInput from '../../shared/components/FormElements/FormInput'
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_COORDINATE,
    VALIDATOR_FILE,
} from '../../shared/utils/validators'
import {
    SIMPLE_INPUT_TYPE,
    LATITUDE_INPUT_TYPE,
    LONGTITUDE_INPUT_TYPE,
    TEXT_AREA_INPUT_TYPE,
    FILE_INPUT_TYPE,
} from '../constants/places-constants'
import { useCallback, useReducer } from 'react'

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid,
                    },
                },
                isValid: formIsValid,
            }
        default:
            return state
    }
}

export default function AddPlace() {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            'file-upload-field': {
                value: '',
                isValid: false,
            },
            'title-field': {
                value: '',
                isValid: false,
            },
            'description-field': {
                value: '',
                isValid: false,
            },
            'latitude-field': {
                value: '',
                isValid: false,
            },
            'longtitude-field': {
                value: '',
                isValid: false,
            },
        },
        isValid: false,
    })

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id,
        })
    }, [])

    function placeSubmitHandler(event) {
        event.preventDefault()
        //TODO: Send data to backend
        console.log(formState.inputs)
    }
    return (
        <section id="new-place-section">
            <form id="new-place-form">
                <Card>
                    <CardContent>
                        <Box noValidate autoComplete="off" id="form-container">
                            <FormInput
                                id="file-upload-field"
                                inputElementType={FILE_INPUT_TYPE}
                                defaultValue=""
                                errorText=""
                                validators={[VALIDATOR_FILE()]}
                                onInput={inputHandler}
                            />
                            <FormInput
                                id="title-field"
                                inputElementType={SIMPLE_INPUT_TYPE}
                                defaultValue=""
                                errorText="Please enter a valid title."
                                validators={[VALIDATOR_REQUIRE()]}
                                onInput={inputHandler}
                            />
                            <FormInput
                                id="description-field"
                                inputElementType={TEXT_AREA_INPUT_TYPE}
                                defaultValue=""
                                errorText="Please enter a description."
                                validators={[VALIDATOR_REQUIRE()]}
                                onInput={inputHandler}
                            />
                            <div id="coordinates-fields-container">
                                <FormInput
                                    id="latitude-field"
                                    inputElementType={LATITUDE_INPUT_TYPE}
                                    defaultValue=""
                                    errorText="Please enter a valid latitude."
                                    validators={[VALIDATOR_COORDINATE()]}
                                    onInput={inputHandler}
                                />
                                <FormInput
                                    id="longtitude-field"
                                    inputElementType={LONGTITUDE_INPUT_TYPE}
                                    defaultValue=""
                                    errorText="Please enter a valid longtitude."
                                    validators={[VALIDATOR_COORDINATE()]}
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
                                disabled={!formState.isValid}
                                onClick={placeSubmitHandler}
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
