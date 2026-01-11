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

    /**
     * Get all groups for the authenticated user
     */

    static async getGroups(req, res) {
        try {

            // check if the user is authenticated
            if(!req.user) {
                return res.status(401)
                .json({
                    success: false,
                    message: 'User not authenticated'
                });
            }

            // find the all the groups created by the logged in user
            const userId = req.user._id;
            const groups = await Group.find({
                createdBy: userId
            });

            return res.status(200)
            .json({
                success: true,
                message: 'Groups fetched successfully',
                data: groups
            });

            
        } catch (error) {
            return res.status(500)
            .json({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }

    /**
     * Get group by ID
     */
    static async getGroupById(req, res) {
        try {
            if(!req.user) {
                return res.status(401)
                .json({
                    success: false,
                    message: 'User not authenticated'
                });
            }

            const { groupId } = req.params;
            const userId = req.user._id;

            const group = await Group.findOne({
                _id: groupId,
                createdBy: userId
            });

            return res.status(200)
            .json({
                success: true,
                message: 'Group fetched successfully',
                data: group
            })
            
        } catch (error) {
            return res.status(500)
            .json({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }

    /**
     * Update group by ID
    */
   static async updateGroupById(req, res) {
    try {

        if(!req.user) {
            return res.status(401)
            .json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const { groupId } = req.params;
        const userId = req.user._id;
        const { name, description } = req.body;

        const updatedGroup = await Group.findOneAndUpdate(
            {
                _id: groupId,
                createdBy: userId
            },
            {
                name: name,
                description: description
            },
            {
                new: true
            }
        );

        return res.status(200).
        json({
            success: true,
            message: 'Group updated successfully',
            data: updatedGroup
        });


        
    } catch (error) {
        return res.status(500).
        json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
   }
}

export default GroupController;
