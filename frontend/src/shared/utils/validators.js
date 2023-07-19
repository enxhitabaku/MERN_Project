const VALIDATOR_TYPE_REQUIRE = 'REQUIRE'
const VALIDATOR_TYPE_COORDINATE = 'COORDINATE'
const VALIDATOR_TYPE_FILE = 'FILE'
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_PASSWORD = 'PASSWORD';

export const VALIDATOR_REQUIRE = () => ({type: VALIDATOR_TYPE_REQUIRE})
export const VALIDATOR_COORDINATE = (val) => ({
    type: VALIDATOR_TYPE_COORDINATE,
    val: val,
})
export const VALIDATOR_FILE = (val) => ({
    type: VALIDATOR_TYPE_FILE,
    val: val,
})
export const VALIDATOR_EMAIL = () => ({type: VALIDATOR_TYPE_EMAIL});
export const VALIDATOR_PASSWORD = () => ({type: VALIDATOR_TYPE_PASSWORD});

export function validate(value, validators) {
    let isValid = true
    for (const validator of validators) {
        if (validator.type === VALIDATOR_TYPE_REQUIRE) {
            isValid = isValid && value.trim().length > 0
        }
        if (validator.type === VALIDATOR_TYPE_COORDINATE) {
            const rgx = new RegExp(/^[1-9]\d*$/)
            isValid = isValid && rgx.test(value)
        }
        if (validator.type === VALIDATOR_TYPE_FILE) {
            isValid = value !== undefined
        }
        if (validator.type === VALIDATOR_TYPE_EMAIL) {
            isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
        }
        if (validator.type === VALIDATOR_TYPE_PASSWORD) {
            isValid = isValid && value.length > 8;
        }
    }
    return isValid
}
