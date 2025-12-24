import jwt from 'jsonwebtoken';
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

/**
 * 
 * Sign JWT method
 */

UserRegisterSchema.methods.signJWT = async function() {
    const user = this;
    const token = await jwt.sign({
        _id: user._id,
        email: user.email
    }, process.env.SECRET_KEY, {
        expiresIn: '1h'
    });

    return token;
}


/**
 * 
 * Validate Password method
 */
UserRegisterSchema.methods.validatePassword = async function(userInputPassword) {
    const user = this;
    const hashedPassword = user.password;
    const isPasswordValid = await bcrypt.compare(userInputPassword, hashedPassword);
    return isPasswordValid;
}

const User = model('User', UserRegisterSchema);
export default User;
