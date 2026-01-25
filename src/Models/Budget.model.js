import mongoose, { Schema, model } from "mongoose";

const BudgetSchema = new Schema({
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    totalBudget: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    }
    }, {
        timestamps: true    
    }
);

const Budget = model("Budget", BudgetSchema);
export default Budget;
