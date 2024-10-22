const Otp = require("../../schema/otp.schema");
const User = require("../../schema/user.schema");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");


module.exports = {
    handler: asyncHandler(async (req, res) => {

        const { email, otp } = req.body

        if (!email || !otp) {
            throw new ApiError(400, "Field should not be empty")
        }

        const isUserExist = await User.findOne({ email })

        if (!isUserExist) {
            throw new ApiError(404, "User not found")
        }

        const isOtpGenrated = await Otp.findOne({ email })

        if (!isOtpGenrated) {
            throw new ApiError(404, "Please genrate otp first")
        }

        const date = new Date()

        if (date > isOtpGenrated.expiresIn) {
            throw new ApiError(404, "Otp has expired")
        }

        if (otp != isOtpGenrated.otp) {
            throw new ApiError(404, "Please send valid otp")
        }
        return res.status(200).json(new ApiResponse(200, {}, "otp has been verified"))


    })
}