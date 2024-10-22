const Otp = require("../../schema/otp.schema");
const User = require("../../schema/user.schema");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const genrateOTP = require("../../utils/genrateOTP");


module.exports = {
    handler: asyncHandler(async (req, res) => {
        const { email } = req.body

        if (!email) {
            throw new ApiError(400, "Please send email")
        }

        const isUserExist = await User.findOne({ email })

        if (!isUserExist) {
            throw new ApiError(400, "User not found")
        }

        const isOtpGenrated = await Otp.findOne({ email })
        if (isOtpGenrated) {
            await Otp.findByIdAndDelete(isOtpGenrated?._id)
        }

        const OTP = await genrateOTP()

        const now = new Date();
        const expiresIn = new Date(now.getTime() + 15 * 60 * 1000);

        const saveOtp = await Otp.create({
            email,
            otp: OTP,
            expiresIn: expiresIn
        })

        if (!saveOtp) {
            throw new ApiError(404, "error while genrating OTP")
        }

        return res.status(201).json(new ApiResponse(200, { OTP: saveOtp }, "Otp sent successfully"))
    })
}