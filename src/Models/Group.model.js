import mongoose, { Schema, model} from 'mongoose';

const GroupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

}, {timestamps: true});

export default model('Group', GroupSchema);
