import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from '@mui/material'

import {useEffect, useReducer} from 'react'

import {validate} from '../../utils/validators'
import ImageUploader from './ImageUploader'
import {
    FILE_INPUT_TYPE,
    PASSWORD_INPUT_TYPE, RADIO_BUTTON_TYPE, RADIO_VALID_VALUES,
    SIMPLE_INPUT_TYPE,
    TEXT_AREA_INPUT_TYPE
} from "../../constants/form-fields-constants";
import FormHelperText from "@mui/material/FormHelperText";

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            }
        case 'TOUCH': {
            return {
                ...state,
                isTouched: true,
            }
        }
        default: {
            return state
        }
    }
}

export default function FormInput({
                                      id,
                                      inputElementType,
                                      label,
                                      defaultValue,
                                      isRequired,
                                      errorText,
                                      validators,
                                      onInput,
                                      isValid = false
                                  }) {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: defaultValue || '',
        isTouched: false,
        isValid: isValid || false,
    })

    useEffect(() => {
        onInput(id, inputState.value, inputState.isValid)
    }, [id, inputState.value, inputState.isValid, onInput])

    const changeHandler = (event) => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: validators,
        })
    }

    const changeFileHandler = (files) => {
        dispatch({
            type: 'CHANGE',
            val: files,
            validators: validators,
        })
    }

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH',
        })
    }

    const hasError = (!inputState.isValid && inputState.isTouched);
    switch (inputElementType) {
        case SIMPLE_INPUT_TYPE: {
            return (
                <TextField
                    required={isRequired ?? false}
                    id={id}
                    label={label ?? ""}
                    defaultValue={defaultValue ?? ""}
                    error={hasError}
                    helperText={hasError ? errorText : ''}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                />
            );
        }
        case PASSWORD_INPUT_TYPE: {
            return (
                <TextField
                    required={isRequired ?? false}
                    id={id}
                    label={label ?? ""}
                    defaultValue={defaultValue ?? ""}
                    error={hasError}
                    helperText={hasError ? errorText : ''}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                />
            );
        }
        case TEXT_AREA_INPUT_TYPE: {
            return (
                <TextField
                    required={isRequired ?? false}
                    id={id}
                    label={label ?? ""}
                    defaultValue={defaultValue ?? ""}
                    error={hasError}
                    helperText={hasError ? errorText : ''}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    multiline
                    rows={8}
                />
            );
        }
        case RADIO_BUTTON_TYPE: {
            return (
                <FormControl>
                    <FormLabel>{label ?? ""}</FormLabel>
                    <RadioGroup
                        id={id}
                        value={inputState.value}
                        required={isRequired ?? false}
                        defaultValue={defaultValue ?? ""}
                        error={hasError}
                        onChange={changeHandler}
                        onBlur={touchHandler}
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="gender-radio-buttons-group"

                    >
                        <FormControlLabel value={RADIO_VALID_VALUES["F"].value} control={<Radio/>}
                                          label={RADIO_VALID_VALUES["F"].label}/>
                        <FormControlLabel value={RADIO_VALID_VALUES["M"].value} control={<Radio/>}
                                          label={RADIO_VALID_VALUES["M"].label}/>
                    </RadioGroup>
                    <FormHelperText>{hasError ? errorText : ''}</FormHelperText>
                </FormControl>
            )
        }
        case FILE_INPUT_TYPE: {
            return (
                <ImageUploader
                    id={id}
                    error={hasError}
                    onChange={changeFileHandler}
                />
            )
        }
        default: {
            return undefined
        }
    }
}
