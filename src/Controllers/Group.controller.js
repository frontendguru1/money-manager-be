import Group from '../Models/Group.model.js';

class GroupController {
    /**
     * Create a new group
     */

    static async createGroup(req, res) {
        try {
            // check if the user is authenticated
            if(!req.user) {
                return res.status(401)
                .json({
                    success: false,
                    message: 'User not authenticated'
                });
            }

            const {name, description } = req.body;

            const newGroup = await Group.create({
                name: name,
                description: description,
                createdBy: req.user._id
            });

            await newGroup.save();

            return res.status(201)
            .json({
                success: true,
                message: 'Group created successfully',
                data: newGroup
            });

            
        } catch (error) {
            res.status(500)
            .json({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            });
        }

    }
}

export default GroupController;
