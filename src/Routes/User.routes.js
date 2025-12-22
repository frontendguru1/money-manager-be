import {Router} from 'express';
import UserController from '../Controllers/User.controller.js';

class UserRoutes {
    router = null;
    constructor() {
        this.router = Router();
        this.getRoutes();
    }
    
    getRoutes() {
        this.router.get('/user/profile', UserController.getUserProfile)
    }

}

export default new UserRoutes().router;
