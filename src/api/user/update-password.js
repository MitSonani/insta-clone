const User = require("../../schema/user.schema");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");

module.exports = {
    handler: asyncHandler(async (req, res) => {
        const { email, newpassword, confirmpassword } = req.body

        if (!email || !newpassword || !confirmpassword) {
            throw new ApiError(400, "Field should not be empty")
        }

        if (newpassword !== confirmpassword) {
            throw new ApiError(404, "Password must be same")
        }

        const isUserExist = await User.findOne({ email })

        if (!isUserExist) {
            throw new ApiError(404, "User not found")
        }

        isUserExist.password = newpassword
        await isUserExist.save()

        return res.status(200).json(new ApiResponse(200, {}, "Password updated"))
    })
}