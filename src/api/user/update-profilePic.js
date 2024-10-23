const User = require("../../schema/user.schema");
const { findById } = require("../../schema/user.schema");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const { uploadOnCloudnary, deleteImageFromCloudinary } = require("../../utils/fileUpload");

module.exports = {
    handler: asyncHandler(async (req, res) => {

        const profileImage = req.file?.path

        if (!profileImage) {
            throw new ApiError(404, "Please upload profile picture")
        }

        const requser = req.user
        if (requser?.profileImagePublicId) {
            const response = await deleteImageFromCloudinary(requser?.profileImagePublicId)
            if (!response) {
                throw new ApiError(404, "Error while delete old profile")
            }
        }

        const uploadProfile = await uploadOnCloudnary(profileImage)

        if (!uploadProfile) {
            throw new ApiError(404, "Error while upload new image")
        }

        const user = await User.findByIdAndUpdate(req?.user._id, {
            $set: {
                profileImage: uploadProfile.url,
                profileImagePublicId: uploadProfile.public_id
            }
        }).select("-password -profileImagePublicId")

        return res.status(200).json(new ApiResponse(200, user, "Profileimage updated"))
    })
}