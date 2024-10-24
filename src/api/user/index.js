const userSignup = require('./user-register')
const userLogin = require('./user-login')
const updateUser = require('./update-user')
const forgetPassword = require('./forgot-password')
const genrateOTP = require('./genrate-otp')
const verifyOtp = require('./verify-otp')
const updatePassword = require('./update-password')
const updateProfilePic = require('./update-profilePic')
const deleteProfilePic = require('./delete-profilePic')
const getProfilebyId = require('./get-profilebyId')
const getProfile = require('./get-login-user-profile')

module.exports = {
    userSignup,
    userLogin,
    updateUser,
    forgetPassword,
    genrateOTP,
    verifyOtp,
    updatePassword,
    updateProfilePic,
    deleteProfilePic,
    getProfilebyId,
    getProfile
}