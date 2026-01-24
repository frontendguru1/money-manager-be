import {validateCreateBudgetSchema} from '../SchemaValidator/Budget.schema.validator.js';

class BudgetValidator {
    static validateCreateBudget(req, res, next) {
        const {isValid, errors, sanitizedData} = validateCreateBudgetSchema(req.body);

        if(!isValid) {
            return res.status(400).json({ errors });
        }
        req.body = sanitizedData;
        next();
    }
}

export default BudgetValidator;
