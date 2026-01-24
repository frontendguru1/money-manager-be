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
}

export default BudgetController;