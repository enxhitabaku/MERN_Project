import {TextField} from '@mui/material'

import {useEffect, useReducer} from 'react'
import {validate} from '../../utils/validators'
import {
    SIMPLE_INPUT_TYPE,
    LATITUDE_INPUT_TYPE,
    LONGITUDE_INPUT_TYPE,
    TEXT_AREA_INPUT_TYPE,
    FILE_INPUT_TYPE,
} from '../../../places/constants/places-constants'
import ImageUploader from '../image-uploader/ImageUploader'

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
                                      defaultValue,
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

    return getInputElement(
        id,
        inputElementType,
        defaultValue,
        !inputState.isValid && inputState.isTouched,
        errorText,
        changeHandler,
        changeFileHandler,
        touchHandler
    )
}

function getInputElement(
    id,
    inputElementType,
    defaultValue,
    hasError,
    errorText,
    changeHandler,
    changeFileHandler,
    touchHandler
) {
    switch (inputElementType) {
        case SIMPLE_INPUT_TYPE: {
            return (
                <TextField
                    required
                    id={id}
                    label="Title"
                    defaultValue={defaultValue}
                    error={hasError}
                    helperText={hasError ? errorText : ''}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                />
            )
        }
        case TEXT_AREA_INPUT_TYPE: {
            return (
                <TextField
                    required
                    id={id}
                    label="Description"
                    variant="filled"
                    multiline
                    rows={8}
                    defaultValue={defaultValue}
                    error={hasError}
                    helperText={hasError ? errorText : ''}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                />
            )
        }
        case LATITUDE_INPUT_TYPE: {
            return (
                <TextField
                    id={id}
                    label="Latitude"
                    defaultValue={defaultValue}
                    error={hasError}
                    helperText={hasError ? errorText : ''}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                ></TextField>
            )
        }
        case LONGITUDE_INPUT_TYPE: {
            return (
                <TextField
                    id={id}
                    label="Longitude"
                    defaultValue={defaultValue}
                    error={hasError}
                    helperText={hasError ? errorText : ''}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                ></TextField>
            )
        }
        case FILE_INPUT_TYPE: {
            return (
                <ImageUploader
                    id={id}
                    onChange={changeFileHandler}
                    error={hasError}
                />
            )
        }
        default: {
            return undefined
        }
    }
}
