import {Router} from 'express';
import { authMiddleware } from '../Middlewares/Global.middleware.js';
import GroupValidator from '../Validators/Group.validator.js';
import GroupController from '../Controllers/Group.controller.js';

class GroupRoutes {
    router = null;

    constructor() {
        this.router = Router();
        this.postRoutes();
        this.getRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    postRoutes() {
        this.router.post('/group', authMiddleware, GroupValidator.validateCreateGroup, GroupController.createGroup);
    }

    getRoutes() {

    }

    patchRoutes() {
        
    }

    deleteRoutes() {

    }

}

export default new GroupRoutes().router;
