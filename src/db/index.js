const monggose = require('mongoose')

const connectionDB = async () => {
    try {
        const connection = await monggose.connect(`${process.env.MONGO_URI}/ ${process.env.DB_NAME}}`)
        console.log(`Database connected on ${process.env.PORT}`)
    } catch (error) {
        console.log("Error while connecting database", error)
        process.exit(1)
    }
}

module.exports = connectionDB