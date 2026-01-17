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
        // create a new group
        this.router.post('/groups', authMiddleware, GroupValidator.validateCreateGroup, GroupController.createGroup);
    }

    getRoutes() {
        // List all
        this.router.get('/groups', authMiddleware, GroupController.getGroups);
        
        // Get group by ID
        this.router.get('/groups/:groupId', authMiddleware, GroupController.getGroupById)
    }

    patchRoutes() {

        // Edit group by ID
        this.router.patch('/groups/:groupId', authMiddleware, GroupValidator.validateCreateGroup, GroupController.updateGroupById);
    }

    deleteRoutes() {
        this.router.delete('/groups/:groupId', authMiddleware, GroupController.deleteGroupById);
    }

}

export default new GroupRoutes().router;
