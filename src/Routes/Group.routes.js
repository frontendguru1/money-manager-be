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
        this.router.post('/groups', authMiddleware, GroupValidator.validateCreateGroup, GroupController.createGroup);
    }

    getRoutes() {
        this.router.get('/groups', authMiddleware, GroupController.getGroups);
        this.router.get('/groups/:groupId', authMiddleware, GroupController.getGroupById)
    }

    patchRoutes() {
        this.router.patch('/groups/:groupId', authMiddleware, GroupValidator.validateCreateGroup, GroupController.updateGroupById);
    }

    deleteRoutes() {

    }

}

export default new GroupRoutes().router;
