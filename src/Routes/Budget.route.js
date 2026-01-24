import {Router} from 'express';
import { authMiddleware } from '../Middlewares/Global.middleware.js';
import BudgetValidator from '../Validators/Budget.validator.js';
import BudgetController from '../Controllers/Budget.controller.js';

class BudgetRoute {
    router = null;

    constructor() {
        this.router = Router();
        this.PostRoutes();
        this.GetRoutes();
        this.PatchRoutes();
        this.DeleteRoutes();
    }

    PostRoutes() {
        this.router.post("/groups/:groupId/budgets", authMiddleware, BudgetValidator.validateCreateBudget, BudgetController.createBudget);
    }

    GetRoutes() {
        // To be implemented
    }

    PatchRoutes() {
        // To be implemented
    }

    DeleteRoutes() {
        // To be implemented
    }

}

export default new BudgetRoute().router;