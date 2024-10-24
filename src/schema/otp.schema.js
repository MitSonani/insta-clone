const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    email: { type: String },
    otp: { type: String, require: true },
    expiresIn: { type: Date, require: true }
}, { timestamps: true })

const Otp = mongoose.model("Otp", otpSchema)

module.exports = Otp