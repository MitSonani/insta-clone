const express = require('express')
const router = express.Router()
const userApi = require('../../api/user')

router.post('/register', userApi.userSignup.handler)




module.exports = router