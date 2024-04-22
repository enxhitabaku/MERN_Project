import {FILE_MAX_SIZE, FILE_WHITE_LIST, RADIO_VALID_VALUES} from "../constants/form-fields-constants";

const VALIDATOR_TYPE_REQUIRE = 'REQUIRE'
const VALIDATOR_TYPE_LATITUDE = 'LAT'
const VALIDATOR_TYPE_LONGITUDE = 'LONG'
const VALIDATOR_TYPE_FILE = 'FILE'
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_PASSWORD = 'PASSWORD';
const VALIDATOR_TYPE_RADIO_GROUP = 'RADIO_GROUP';

export const VALIDATOR_REQUIRE = () => ({type: VALIDATOR_TYPE_REQUIRE})
export const VALIDATOR_LATITUDE = () => ({type: VALIDATOR_TYPE_LATITUDE})
export const VALIDATOR_LONGITUDE = () => ({type: VALIDATOR_TYPE_LONGITUDE})
export const VALIDATOR_FILE = () => ({type: VALIDATOR_TYPE_FILE})
export const VALIDATOR_EMAIL = () => ({type: VALIDATOR_TYPE_EMAIL});
export const VALIDATOR_PASSWORD = () => ({type: VALIDATOR_TYPE_PASSWORD});
export const VALIDATOR_RADIO_GROUP = () => ({type: VALIDATOR_TYPE_RADIO_GROUP});

export function validate(value, validators) {
    let isValid = true
    for (const validator of validators) {
        if (validator.type === VALIDATOR_TYPE_REQUIRE) {
            isValid = isValid && value.trim().length > 0;
        }
        if (validator.type === VALIDATOR_TYPE_LATITUDE) {
            //Allowed float range: 39 to 42
            const rgx = new RegExp(/^((?:39|4[0-2])(?:\.\d+)?)$/)
            isValid = isValid && rgx.test(value);
        }
        if (validator.type === VALIDATOR_TYPE_LONGITUDE) {
            //Allowed float range: 19 to 21
            const rgx = new RegExp(/^(?:19|2[0-1])(?:\.\d+)?$/)
            isValid = isValid && rgx.test(value);
        }
        if (validator.type === VALIDATOR_TYPE_FILE) {
            isValid = value !== undefined && FILE_WHITE_LIST.includes(value.type) && FILE_MAX_SIZE >= value.size;
            isValid = true;
        }
        if (validator.type === VALIDATOR_TYPE_EMAIL) {
            isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
        }
        if (validator.type === VALIDATOR_TYPE_PASSWORD) {
            isValid = isValid && value.length > 8;
        }
        if (validator.type === VALIDATOR_TYPE_RADIO_GROUP) {
            const radioGroupOptionsValue = Object.values(RADIO_VALID_VALUES).map((option) => option.value)
            isValid = isValid && radioGroupOptionsValue.includes(value);
        }
    }
    return isValid
}
