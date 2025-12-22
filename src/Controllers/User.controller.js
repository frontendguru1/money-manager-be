import User from '../Models/User.register.model.js';
class UserController {
    static async getUserProfile(req, res) {
        try {
            const userId = "694947a4365e0243e37e7ff0";

            const userData = await User.findOne({_id: userId});

            if(!userData) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'User profile fetched successfully',
                data: userData
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

export default UserController;


// register ==> Login --> auth Token (_Id, userEmail) --> set the token in cookies ===> access profile --> deCode Token (_id)
// Get Profile : User.findOne({_id})
