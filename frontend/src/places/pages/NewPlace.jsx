import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import {Button, CardActions} from '@mui/material'

import FormInput from '../../shared/components/FormElements/FormInput'
import useForm from '../../shared/hooks/place-form-hook'
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_COORDINATE,
    VALIDATOR_FILE,
} from '../../shared/utils/validators'
import {
    SIMPLE_INPUT_TYPE,
    LATITUDE_INPUT_TYPE,
    LONGITUDE_INPUT_TYPE,
    TEXT_AREA_INPUT_TYPE,
    FILE_INPUT_TYPE,
} from '../constants/places-constants'
import {
    FILE_UPLOAD_FIELD_ID,
    DESCRIPTION_FIELD_ID,
    LATITUDE_FIELD_ID,
    LONGITUDE_FIELD_ID,
    TITLE_FIELD_ID,
} from '../../shared/constants/form-fields-constants'

const initialFormSetUp = {
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
    },
}
export default function AddPlace() {
    const [formState, inputHandler, setFormData] = useForm(initialFormSetUp, false)

    function placeSubmitHandler(event) {
        event.preventDefault()
        //TODO: Send data to backend
        console.log(formState.inputs)
    }

    function handleOnDiscard() {
        if (window.confirm("Are you sure to discard your changes ?")) {
            setFormData(initialFormSetUp, false);
            console.log("Discarding..");
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
                                inputElementType={FILE_INPUT_TYPE}
                                defaultValue={""}
                                isValid={formState.inputs.FILE_UPLOAD_FIELD_ID.isValid}
                                errorText=""
                                validators={[VALIDATOR_FILE()]}
                                onInput={inputHandler}
                            />
                            <FormInput
                                id={TITLE_FIELD_ID}
                                inputElementType={SIMPLE_INPUT_TYPE}
                                defaultValue={formState.inputs.TITLE_FIELD_ID.value}
                                isValid={formState.inputs.TITLE_FIELD_ID.isValid}
                                errorText="Please enter a valid title."
                                validators={[VALIDATOR_REQUIRE()]}
                                onInput={inputHandler}
                            />
                            <FormInput
                                id={DESCRIPTION_FIELD_ID}
                                inputElementType={TEXT_AREA_INPUT_TYPE}
                                defaultValue={formState.inputs.DESCRIPTION_FIELD_ID.value}
                                isValid={formState.inputs.DESCRIPTION_FIELD_ID.isValid}
                                errorText="Please enter a description."
                                validators={[VALIDATOR_REQUIRE()]}
                                onInput={inputHandler}
                            />
                            <div id="coordinates-fields-container">
                                <FormInput
                                    id={LATITUDE_FIELD_ID}
                                    inputElementType={LATITUDE_INPUT_TYPE}
                                    defaultValue={formState.inputs.LATITUDE_FIELD_ID.value}
                                    isValid={formState.inputs.LATITUDE_FIELD_ID.isValid}
                                    errorText="Please enter a valid latitude."
                                    validators={[VALIDATOR_COORDINATE()]}
                                    onInput={inputHandler}
                                />
                                <FormInput
                                    id={LONGITUDE_FIELD_ID}
                                    inputElementType={LONGITUDE_INPUT_TYPE}
                                    defaultValue={formState.inputs.LONGITUDE_FIELD_ID.value}
                                    isValid={formState.inputs.LONGITUDE_FIELD_ID.isValid}
                                    errorText="Please enter a valid longitude."
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
                                onClick={handleOnDiscard}
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
