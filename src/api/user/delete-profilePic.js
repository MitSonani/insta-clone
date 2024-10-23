const User = require("../../schema/user.schema");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const { deleteImageFromCloudinary } = require("../../utils/fileUpload");

module.exports = {
    handler: asyncHandler(async (req, res) => {
        const publicId = req.user.profileImagePublicId;

        if (!publicId) {
            throw new ApiError(400, "No profile image to delete");
        }

        const updateUser = await User.findByIdAndUpdate(req.user._id, {
            $set: {
                profileImage: null,
                profileImagePublicId: null,
            },
        });

        if (!updateUser) {
            throw new ApiError(404, "Error while deleting profile");
        }

        const deleteImage = await deleteImageFromCloudinary(publicId);

        if (!deleteImage) {
            throw new ApiError(404, "Error while deleting profile image from Cloudinary");
        }

        return res.status(200).json(new ApiResponse(200, {}, "Profile image deleted successfully"));
    }),
};
