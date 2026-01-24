import validator from 'validator';

export const validateCreateBudgetSchema = (data) => {
    const errors = {};
    const sanitizedData = {};
    const {month, year, totalBudget} = data;


    // month validation
    if(validator.isEmpty(month + '')) {
        errors.month = "Month is required";
    } else if(validator.isInt(month + '', {min: 1, max: 12})) {
        sanitizedData.month = parseInt(month);
    } else {
        errors.month = "Month should be a number and it should be between 1 and 12";
    }


    // year validation
    const currentYear = new Date().getFullYear();
    const maxYear = currentYear + 5;
    if(validator.isEmpty(year + '')) {
        errors.year = "Year is required";
    } else if(validator.isInt(year + '', {min: currentYear, max: maxYear})) {
        sanitizedData.year = parseInt(year);
    } else {
        errors.year = `Year should be a valid number between ${currentYear} and ${maxYear}`;
    }

    // totalBudget validation
    if(validator.isEmpty(totalBudget + '')) {
        errors.totalBudget = "Total Budget is required";
    } else if(validator.isFloat(totalBudget + '', {min: 500})) {
        sanitizedData.totalBudget = parseFloat(totalBudget);
    } else {
        errors.totalBudget = "Total Budget should be a valid number greater than or equal to 500";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
        sanitizedData
    }
}