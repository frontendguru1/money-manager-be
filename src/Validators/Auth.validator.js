
import {validateRegisterSchema} from '../SchemaValidator/Auth.schema.validator.js';

class AuthValidator {
    static validateRegistration(req, res, next) {
        const {isValid, errors, sanitizedData} = validateRegisterSchema(req.body);

        console.log('errors', errors);

        if(!isValid) {
            return res.json({
                success: false,
                message: 'Validation errors',
                errors
            });
        }

        req.body = sanitizedData;
        next();
    }
}

export default AuthValidator;
