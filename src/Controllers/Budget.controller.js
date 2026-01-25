import Budget from "../Models/Budget.model.js";
import Group from "../Models/Group.model.js";

class BudgetController {
    /**
     * Create a new budget of a specific group
     */
    static async createBudget(req, res) {
        try {
            if(!req.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const {month, year, totalBudget } = req.body;
            const { groupId } = req.params;
            const createdBy = req.user._id;

            // check if group exists
            const group = await Group.findById(groupId);
            if(!group) {
                return res.status(404).json({ message: "Invalid group ID" });
            }

            // check if the budget already exists for the month and year
            const isBudgetExists = await Budget.findOne({
                groupId,
                month,
                year
            },);

            if(isBudgetExists) {
                return res.status(400).json({ message: "Budget already exists for the specified month and year" });
            }

            // save the budget
            const newBudget = new Budget({
                month,
                year,
                totalBudget,
                createdBy,
                groupId,
                isActive: true
            });

            await newBudget.save();
            await newBudget.populate('createdBy', 'firstName lastName email');
            return res
            .status(201)
            .json(
                { 
                    message: "Budget created successfully", 
                    data: newBudget
                }
            );
            
        } catch (error) {
            return res.status(500).json(
                { message: "Internal Server Error" }
            );
        }
        
    }

    /**
     * Get all budgets of a specific group
     */
    static async getBudgetsByGroupId(req, res) {
        try {
            // ensure user is authenticated
            if(!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }
            // check if group exists
            const { groupId } = req.params;
            const isGroupExists = await Group.findById(groupId);
            if(!isGroupExists) {
                return res.status(404).json({ message: "Invalid group ID" });
            }

            // fetch budgets for the group
            const budgets = await Budget.find({
                groupId,
                createdBy: req.user._id,
                isActive: true
            })
            .populate('createdBy', 'firstName lastName email')
            .populate('groupId', 'name description');

            return res.status(200)
            .json({
                message: "Budgets fetched successfully",
                data: budgets
            });
            
        } catch (error) {
            return res.status(500).json(
                { message: "Internal Server Error" }
            );
        }
    }

    /**
     * Update Budget by ID
     */

    static async updateBudgetById(req, res) {
        try {

            // check if user is authenticated
            if(!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }
            const { groupId, budgetId } = req.params;
            const {month, year, totalBudget } = req.body;

            // check if group exists
            const isGroupExists = await Group.findById(groupId);
            if(!isGroupExists) {
                return res.status(404).json({ message: "Invalid group ID" });
            }

            // check if budget exists by Id
            const budget = await Budget.findById(budgetId);
            if(!budget) {
                return res.status(404).json({ message: "Invalid budget ID" });
            }

            // check if the budget already exists for the month, year and group
            const isBudgetExists = await Budget.findOne({
                groupId,
                month,
                year
            },);

            if(isBudgetExists) {
                return res.status(400).json({ message: "Budget already exists for the specified month and year" });
            }

            // save the budget
            budget.month = month || budget.month;
            budget.year = year || budget.year;
            budget.totalBudget = totalBudget || budget.totalBudget;
            await budget.save();

            // return the updated budget
            return res.status(200).json(
                {
                    message: "Budget updated successfully",
                    data: budget
                }
            );
            
        } catch (error) {
            return res.status(500).json(
                { message: "Internal Server Error" }
            );
        }
    }

    /**
     * Delete Budget by ID
     */

    static async deleteBudgetById(req, res) {
        try {
            if(!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }

            const { groupId, budgetId } = req.params;
            // check if group exists
            const isGroupExists = await Group.findById(groupId);
            if(!isGroupExists) {
                return res.status(404).json({ message: "Invalid group ID" });
            }

            // check if budget exists by Id
            const budget = await Budget.findById(budgetId);
            if(!budget) {
                return res.status(404).json({ message: "Invalid budget ID" });
            }

            // set isActive to false
            budget.isActive = false;
            await budget.save();

            return res.status(200).json(
                {
                    message: "Budget deleted successfully"
                }
            );
        } catch (error) {
            return res.status(500).json(
                { message: "Internal Server Error" }
            );
        }
    }
}

export default BudgetController;
