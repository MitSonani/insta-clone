const express = require('express')
const router = express.Router()
const userApi = require('../../api/user')
const upload = require('../../middelwares/multer')
const { authMiddelware } = require('../../middelwares/auth')

router.post('/register', upload.single("profileImage"), userApi.userSignup.handler)
router.post('/login', userApi.userLogin.handler)
router.put('/update-user', authMiddelware, userApi.updateUser.handler)
router.put('/forget-password', authMiddelware, userApi.forgetPassword.handler)
router.post('/genrateOtp', userApi.genrateOTP.handler)
router.post('/verify-otp', userApi.verifyOtp.handler)


module.exports = router