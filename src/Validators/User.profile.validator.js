import {updateUserProfileSchema} from '../Utils/validate.user.profile.js';

class UserProfileValidator {
    static validateProfileUpdate(req, res, next) {
        const {isValid, errors, sanitizedData} = updateUserProfileSchema(req.body);

        if(!isValid) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors
            });
        }

        req.body = sanitizedData;
        next();
    }
}

export default UserProfileValidator;