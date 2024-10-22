const User = require("../../schema/user.schema");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");

const gernrateAccessandRefreshToken = async (userId) => {

    try {
        const user = await User.findById(userId)

        const refreshToken = await user.genraterefreshToken()
        const accessToken = await user.genrateAccessToken()

        user.refreshToken = refreshToken
        user.accessToken = accessToken
        await user.save()

        return { refreshToken, accessToken }
    } catch (error) {
        throw new ApiError(500, "error while genrating tokens")
    }
}

module.exports = {
    handler: asyncHandler(
        async (req, res) => {
            const { username, email, password } = req.body


            if ((!username && !email) || !password) {
                throw new ApiError(404, "Username or password should not be null")
            }

            const user = await User.findOne({
                $or: [{ email }, { username }]
            })

            if (!user) {
                throw new ApiError(404, "user does not exist")
            }
            const isPasswordValid = await user.isPasswordCorrect(password)

            if (!isPasswordValid) {
                throw new ApiError(404, "username or password is not correct")
            }

            const { refreshToken, accessToken } = await gernrateAccessandRefreshToken(user._id)

            const loggedInUser = await User.findById(user._id).select("-password")

            const options = {
                httpOnly: true,
                secure: true
            }

            return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
                new ApiResponse(200, loggedInUser, "Logged In")
            )


        }
    )
}