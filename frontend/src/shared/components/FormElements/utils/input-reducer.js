import {validate} from "../../../utils/validators";

export default function inputReducer(state, action) {
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
