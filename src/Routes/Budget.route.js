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
        this.router.get("/groups/:groupId/budgets", authMiddleware, BudgetController.getBudgetsByGroupId)
    }

    PatchRoutes() {
        this.router.patch("/groups/:groupId/budgets/:budgetId", authMiddleware, BudgetValidator.validateCreateBudget, BudgetController.updateBudgetById);
    }

    DeleteRoutes() {
        this.router.delete("/groups/:groupId/budgets/:budgetId", authMiddleware, BudgetController.deleteBudgetById);
    }

}

export default new BudgetRoute().router;