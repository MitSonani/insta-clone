const express = require('express')
const router = express.Router()
const userApi = require('../../api/user')
const upload = require('../../middelwares/multer')

router.post('/register', upload.single("profileImage"), userApi.userSignup.handler)
router.post('/login', userApi.userLogin.handler)




module.exports = router