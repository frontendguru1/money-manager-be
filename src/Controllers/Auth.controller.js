import bcrypt from 'bcrypt';
import User from '../Models/User.register.model.js';
import exp from 'constants';

class AuthController {

    /**
     * user registration
     */
    static async register(req, res) {

        try {
            const {firstName, lastName, email, phone, city, state, zipcode, country, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const data = {
                firstName,
                lastName,
                email,
                phone,
                city,
                state,
                zipcode,
                country,
                password: hashedPassword
            }

            // Check if the user already exists with the same email or phone
            const existingUser = await User.findOne({ $or: [ 
                { email: email },
                { phone: phone } ]
            });

            if(existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'User with given email or phone already exists'
                });
            }

            const newUser = await User.create(data);

            return res.status(201).json({
                message: "User registered successfully",
                user: newUser
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }

    /**
     * User Login
     */

    static async login(req, res) {
        try {
            
            const {email, password} = req.body;

            const user = await User.findOne({
                email: email
            });

            if(!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            const isPasswordValid = await user.validatePassword(password);

            if(!isPasswordValid) {
                return res.status(404).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            // Generate JWT Token
            const token = await user.signJWT();

            // set the token in cookies
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + 3600000) // 1 hour
            });

            return res.status(200).json({
                success: true,
                message: 'User logged in successfully'
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }

    /**
     * User Logout
     */
    static logout(req, res) {
        try {
            // res.clearCookie('token');  
            res.cookie('token', '', { expires: new Date(0) });
            return res.status(200).json({
                success: true,
                message: 'User logged out successfully'
            });
            
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }

}

export default AuthController;
