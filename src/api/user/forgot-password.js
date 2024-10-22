const User = require("../../schema/user.schema");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");


module.exports = {
    handler: asyncHandler(async (req, res) => {

        const { currentPassword, newPassword, confirmpassword } = req.body

        if (!currentPassword || !newPassword || !confirmpassword) {
            throw new ApiError(400, "Field should not be empty")
        }

        if (newPassword != confirmpassword) {
            throw new ApiError(400, "newpassword and confirmpassword shuold be same")
        }

        const user = await User.findById(req.user._id)

        const comparePassword = await user.isPasswordCorrect(currentPassword)

        if (!comparePassword) {
            throw new ApiError(404, "Current password is not correct")
        }

        user.password = newPassword
        user.save()

        return res.status(200).json(new ApiResponse(200, {}, "Password updated"))


    })
}