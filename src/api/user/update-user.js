const User = require("../../schema/user.schema");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");


module.exports = {
    handler: asyncHandler(async (req, res) => {

        const { username, bio } = req.body

        if (!username && !bio) {
            throw new ApiError(400, "Please send body")
        }

        const updatedUser = await User.findByIdAndUpdate(req.user?._id, {
            $set: {
                username, bio
            }
        },
            {
                new: true
            })
        return res.status(200).json(
            new ApiResponse(200, updatedUser, "User updated successfully")
        )

    })
}