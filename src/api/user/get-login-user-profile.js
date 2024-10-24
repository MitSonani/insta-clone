const User = require("../../schema/user.schema");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");


module.exports = {
    handler: asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id).select("-password -refreshToken -accessToken -profileImagePublicId")

        if (!user) {
            throw new ApiError(404, "user not found")
        }
        return res.status(200).json(new ApiResponse(200, user, "User fetched"))
    })
}