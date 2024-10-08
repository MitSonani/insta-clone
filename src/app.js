const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const userRoutes = require('./routes/user')

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))
app.use(express.json({
    limit: "40kb"
}))
app.use(express.urlencoded({ extended: true, limit: "40kb" }))
app.use(express.static("public"))
app.use(cookieParser())

app.use('/api/v1', userRoutes)

module.exports = app
