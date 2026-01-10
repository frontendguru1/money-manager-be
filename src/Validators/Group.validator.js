import { validateCreateGroupSchema } from "../SchemaValidator/GroupSchemaValidator.js";

class GroupValidator {
    static validateCreateGroup(req, res, next) {
        const {isValid, errors, sanitizedData} = validateCreateGroupSchema(req.body);

        if(!isValid) {
            return res.status(400).json({ errors });
        }

        req.body = sanitizedData;
        next();
    }
}

export default GroupValidator;