import {Router} from 'express';
import UserController from '../Controllers/User.controller.js';
import { authMiddleware } from '../Middlewares/Global.middleware.js';
import UserProfileValidator from '../Validators/User.profile.validator.js'

class UserRoutes {
    router = null;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.patchRoutes();
    }
    
    getRoutes() {
        this.router.get('/user/profile',
            authMiddleware,
            UserController.getUserProfile
        );
    }

    patchRoutes() {
        this.router.patch('/user/profile',
            authMiddleware,
            UserProfileValidator.validateProfileUpdate,
            UserController.updateUserProfile
        );
    }

}

export default new UserRoutes().router;


// User --> update Profile --> {name, age, gender, phone} -> body (payload)

// 1. AuthMiddleware -> validate if the user is logged in --> DONE
// 2. validate all the fields which are coming in the body --> DONE
// 3. Controller --> DB query to update the user profile
// 4. response back to the user with the updated data
