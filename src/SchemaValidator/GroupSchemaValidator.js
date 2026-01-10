import validator from "validator";

export const validateCreateGroupSchema = (data) => {
    const errors = {};
    const sanitizedData = {};
    const {name, description } = data // destructuring


    // name validation
    if(validator.isEmpty(name)) {
        errors.name = "Group name is required";
    } else {
        sanitizedData.name = validator.escape(name);
    }

    // group description validation
    if(validator.isEmpty(description)) {
        errors.description = "Group description is required";
    } else {
        sanitizedData.description = validator.escape(description);
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
        sanitizedData
    }
}