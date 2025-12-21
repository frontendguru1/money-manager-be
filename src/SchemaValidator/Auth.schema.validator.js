import validator from 'validator';
import {validateString} from '../Utils/utils.js';

export function validateRegisterSchema(data) {
    const errors = {};
    const sanitizedData = {};
    const {firstName, lastName, email, phone, city, state, zipcode, country, password} = data;

    // const stringFields = ["firstName", "lastName"];


    // First Name Validation
    const {error: firstNameError, sanitizedData: firstNameData} = validateString("firstName", firstName);
    if(Object.keys(firstNameError).length > 0) {
        errors.firstName = firstNameError.firstName;
    } else {
        sanitizedData.firstName = firstNameData;
    }

    // Last Name Validation
    const {error: lastNameError, sanitizedData: lastNameData} = validateString("lastName", lastName);
     if(Object.keys(lastNameError).length > 0) {
        errors.lastName = lastNameError.lastName;
    } else {
        sanitizedData.lastName = lastNameData;
    }



    return {
        isValid: Object.keys(errors).length === 0,
        errors,
        sanitizedData
    }
}