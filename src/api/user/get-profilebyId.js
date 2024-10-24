const User = require("../../schema/user.schema");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");

module.exports = {
    handler: asyncHandler(async (req, res) => {
        const { userId } = req.params

        const isUserExist = await User.findById(userId).select("-password -email -refreshToken -profileImagePublicId -accessToken")

        if (!isUserExist) {
            throw new ApiError(404, "user not found")
        }

        return res.status(200).json(new ApiResponse(200, { user: isUserExist }, "user fetched"))

    })
}