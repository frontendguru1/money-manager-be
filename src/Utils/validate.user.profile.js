import validator from 'validator';

export const updateUserProfileSchema = (data) => {
    const errors = {};
    const sanitizedData = {};
    const {firstName, lastName, city, state, zipcode, country} = data;

    // First Name Validation
    if(firstName !== undefined) {
        // check the length of first name
        if(!validator.isLength(firstName.trim(), {min: 2, max: 32})) {
            errors.firstName = "First name must be between 2 and 32 characters";
        } else if(!validator.isAlpha(firstName.replace(/\s/g, ''))) {
            errors.firstName = "First name must contain only letters";
        } else {
            sanitizedData.firstName = firstName.trim();
        }
    }

    // last Name Validation
    if(lastName !== undefined) {
        // check the length of last name
        if(!validator.isLength(lastName.trim(), {min: 2, max: 32})) {
            errors.lastName = "Last name must be between 2 and 32 characters";
        } else if(!validator.isAlpha(lastName.replace(/\s/g, ''))) {
            errors.lastName = "Last name must contain only letters";
        } else {
            sanitizedData.lastName = lastName.trim();
        }
    }

    // city Validation
    if(city !== undefined) {
        if(!validator.isLength(city.trim(), {min: 2, max: 64})) {
            errors.city = "City must be between 2 and 64 characters";
        } else if(!validator.isAlpha(city.replace(/\s/g, ''))) {
            errors.city = "City must contain only letters";
        } else {
            sanitizedData.city = city.trim();
        }
    }

    // state Validation
    if(state !== undefined) {
        if(!validator.isLength(state.trim(), {min: 2, max: 64})) {
            errors.state = "State must be between 2 and 64 characters";
        } else if(!validator.isAlpha(state.replace(/\s/g, ''))) {
            errors.state = "State must contain only letters";
        } else {
            sanitizedData.state = state.trim();
        }
    }

    // zipcode Validation
    if(zipcode !== undefined) {
        if(!validator.isPostalCode(zipcode + '', 'any')) {
            errors.zipcode = "Invalid zipcode";
        } else {
            sanitizedData.zipcode = zipcode;
        }
    }

    // country Validation
    if(country !== undefined) {
        if(!validator.isLength(country.trim(), {min: 2, max: 64})) {
            errors.country = "Country must be between 2 and 64 characters";
        } else if(!validator.isAlpha(country.replace(/\s/g, ''))) {
            errors.country = "Country must contain only letters";
        } else {
            sanitizedData.country = country.trim();
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
        sanitizedData
    }
}