import {regex} from '../Shared/Regex/validateRegex';

export const validationHandler = (name, value) => {
    return regex[name].test(value)
}

