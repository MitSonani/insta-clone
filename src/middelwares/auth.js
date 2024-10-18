const User = require("../schema/user.schema");
const ApiError = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");
const jwt = require('jsonwebtoken')

module.exports = {
    handler: asyncHandler(async (req, _, next) => {

        try {
            const userToken = req.cookies.accessToken || req.header('Authorization')?.replace('Bearer ', '')

            if (!userToken) {
                throw new ApiError(404, "Unauthorized request")
            }

            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

            if (!user) {
                throw new ApiError(401, "Invalid accessToken")
            }
            req.user = user;
            next()
        } catch (error) {
            throw new ApiError(401, error?.message || "Invalid Token")
        }

    })
}