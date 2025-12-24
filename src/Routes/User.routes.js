import {Router} from 'express';
import UserController from '../Controllers/User.controller.js';
import { authMiddleware } from '../Middlewares/Global.middleware.js';

class UserRoutes {
    router = null;
    constructor() {
        this.router = Router();
        this.getRoutes();
    }
    
    getRoutes() {
        this.router.get('/user/profile', authMiddleware, UserController.getUserProfile)
    }

}

export default new UserRoutes().router;
