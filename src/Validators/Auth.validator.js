
import {validateRegisterSchema, validateLoginSchema} from '../SchemaValidator/Auth.schema.validator.js';

class AuthValidator {

    // register user
    static validateRegistration(req, res, next) {
        const {isValid, errors, sanitizedData} = validateRegisterSchema(req.body);

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

    // login user
    static validateLogin(req, res, next) {
        const {isValid, errors, sanitizedData} = validateLoginSchema(req.body);

        if(!isValid) {
            return res.json({
                success: false,
                message: 'Login Validation errors',
                errors
            });
        }

        req.body = sanitizedData;
        next();
    }
}

export default AuthValidator;
