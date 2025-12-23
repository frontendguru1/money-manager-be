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

    // email validation
    if(!validator.isEmail(email)) {
        errors.email = "Invalid email format";
    } else {
        sanitizedData.email = email;
    }

    // password validation

    if(validator.isEmpty(password)) {
        errors.password = "Password is required";
    } else if(!validator.isLength(password, {min: 6})) {
        errors.password = "Password must be 6 characters long";
    } else {
        sanitizedData.password = password;
    }

    // phone validation
    if(!validator.isMobilePhone(phone + '')) {
        errors.phone = "Invalid phone number";
    } else {
        sanitizedData.phone = phone;
    }

    // city validation
    const {error: cityError, sanitizedData: cityData} = validateString("city", city);

    console.log('city error', cityError);
    console.log('city data', cityData);

    if(Object.keys(cityError).length > 0) {
        errors.city = cityError.city;
    } else {
        sanitizedData.city = cityData;
    }



    // state validation
    const {error: stateError, sanitizedData: stateData} = validateString("state", state);
    if(Object.keys(stateError).length > 0) {
        errors.state = stateError.state;
    } else {
        sanitizedData.state = stateData;
    }

    // zipcode validation
    console.log('zipcode value', zipcode);
    if(validator.isEmpty(zipcode)) {
        errors.zipcode = "Zipcode is required";
    } else if(!validator.isLength(zipcode, {min: 6, max: 6})) {
        errors.zipcode = "Zipcode must be 6 characters long";
    } else {
        sanitizedData.zipcode = zipcode;
    }

    // country validation
    const {error: countryError, sanitizedData: countryData} = validateString("country", country);
    if(Object.keys(countryError).length > 0) {
        errors.country = countryError.country;
    } else {
        sanitizedData.country = countryData;
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
        sanitizedData
    }
}

export function validateLoginSchema(data) {
    const errors = {};
    const sanitizedData = {};
    const {email, password} = data;

    // check if the email is present and valid
    if(validator.isEmpty(email)) {
        errors.email = "Email is required";
    } else if(!validator.isEmail(email)) {
        errors.email = "Invalid email format";
    } else {
        sanitizedData.email = email;
    }


    // check if the password is present
    if(validator.isEmpty(password)) {
        errors.password = "Password is required";
    } else {
        sanitizedData.password = password;
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
        sanitizedData
    }
}