import bcrypt from 'bcrypt';
import mongoose, { Schema, model } from "mongoose";

const UserRegisterSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone : {
        type: String,
        required: true,
        unique: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

}, {
    timestamps: true
});

UserRegisterSchema.methods.validatePassword = async function(userInputPassword) {
    const user = this;
    const hashedPassword = user.password;
    const isPasswordValid = await bcrypt.compare(userInputPassword, hashedPassword);
    return isPasswordValid;
}

const User = model('User', UserRegisterSchema);

export default User;
