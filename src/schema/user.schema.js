const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(

    {
        username: {
            type: String,
            required: true,
            toLowerCase: true
        },
        email: {
            type: String,
            required: true,
            toLowerCase: true
        },
        password: {
            type: String,
            required: true,
        },
        profileImage: {
            type: String,
        },
        bio: {
            type: String,
        },
        gender: {
            type: String,
        },
        refreshToken: {
            type: String,
        },

    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcryptjs.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcryptjs.compare(this.password, password)
}

userSchema.methods.genrateAccessToken = async function () {
    return jwt.sign({
        _id: this._id,
        email: this._email,
        username: this._username
    },
        process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}


userSchema.methods.refreshToken = async function () {
    return jwt.sign({
        _id: this._id,
        username: this._username
    },
        process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}


const User = mongoose.model("User", userSchema)

module.exports = User