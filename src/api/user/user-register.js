const User = require('../../schema/user.schema')
const ApiError = require('../../utils/ApiError')
const ApiResponse = require('../../utils/ApiResponse')
const { asyncHandler } = require('../../utils/asyncHandler')
const uploadOnCloudnary = require('../../utils/fileUpload')

module.exports = {
    handler:
        asyncHandler(
            async (req, res) => {
                const { username, email, password, gender } = req.body

                if (!username || !email || !password || !gender) {
                    throw new ApiError(400, "Please enter username or email or password or gender")
                }

                const isUserExist = await User.findOne({
                    $or: [{ username }, { email }]
                })

                if (isUserExist) {
                    throw new ApiError(409, "User alredy registered")
                }

                const profileImagePath = req?.file?.path
                let profileImage;

                if (profileImagePath) {
                    profileImage = await uploadOnCloudnary(profileImagePath)
                }

                const createUser = await User.create({
                    username,
                    email,
                    password,
                    gender,
                    profileImage: profileImage?.url
                })

                const isUser = await User.findById(createUser?._id).select("-password")

                if (!isUser) {
                    throw new ApiError(501, "Getting error while user registered")
                }

                return res.status(201).json(
                    new ApiResponse(201, { user: isUser }, "user Registered")
                )

            }
        )


}