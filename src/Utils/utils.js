import validator from 'validator';

export function validateString (fieldName, fieldValue) {

    // console.log(`${fieldName} field:`, fieldValue);
    let field = fieldValue.trim().replace(/\s/g, '');

    const error = {};
    let sanitizedData = null;
    if(field === undefined || field === null || validator.isEmpty(field)) {
            error[fieldName] = `${fieldName} is required`;
            return {error, sanitizedData};
        } else if(!validator.isLength(field, {min: 2, max: 32})) {
            error[fieldName] = `${fieldName} must be between 2 and 32 characters`;
            return {error, sanitizedData};
        } else if(!validator.isAlpha(field.toString())) {
            error[fieldName] = `${fieldName} must contain only letters`;
            return {error, sanitizedData};
        } else if(!validator.isAlphanumeric(field.replace(/\s/g, ''))) {
            error[fieldName] = `${fieldName} must not contain special characters`;
            return {error, sanitizedData};
        } else {
            sanitizedData = field;
        }

        // console.log('utils error', error);
        return {error, sanitizedData}
}
