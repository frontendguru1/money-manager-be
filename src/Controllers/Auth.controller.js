import User from '../Models/User.register.model.js';

class AuthController {

    /**
     * user registration
     */
    static async register(req, res) {

        try {
            const {firstName, lastName, email, phone, city, state, zipcode, country, password } = req.body;

            const data = {
                firstName,
                lastName,
                email,
                phone,
                city,
                state,
                zipcode,
                country,
                password
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

}

export default AuthController;
