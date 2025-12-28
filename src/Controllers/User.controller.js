import User from '../Models/User.register.model.js';
import { uploadToCloudinary } from '../service/cloudinary.js';
class UserController {
    /**
     * Get User Profile
     */
    static async getUserProfile(req, res) {
        try {

            const user = req.user

            if(!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'User profile fetched successfully',
                data: user
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
     * Update User Profile
     */
    static async updateUserProfile(req, res) {
        try {
            const user = req.user;
            if(!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            const {firstName, lastName, city, state, zipcode, country} = req.body;

            const updatedData = {
                firstName,
                lastName,
                city,
                state,
                zipcode,
                country
            }

            Object.keys(updatedData).forEach(key => {
                user[key] = updatedData[key];
            });

            await user.save();

            return res.status(200).json({
                success: true,
                message: 'User profile updated successfully',
                data: user
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
     * Upload Profile Image
     */
    static async uploadProfileImage(req, res) {
        try {

            if(!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not authenticated'
                });
            }

            const profileImagePath = req?.file?.path;

            if(!profileImagePath) {
                return res.status(400).json({
                    success: false,
                    message: 'No profile image uploaded'
                });
            }

            const fileResponse = await uploadToCloudinary(profileImagePath);
            if(!fileResponse) {
                return res.status(500).json({
                    success: false,
                    message: 'Error while uploading profile image'
                });
            }

            req.user.profileImage = fileResponse.secure_url;
            req.user.save();

            return res.status(200).json({
                success: true,
                message: 'Profile image uploaded successfully',
                data: {
                    profileImageUrl: fileResponse.url
                }
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
