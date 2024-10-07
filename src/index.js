
const dotenv = require('dotenv')
dotenv.config()
const connectionDB = require('./db/index')
const app = require('./app')



connectionDB().then(() => {

    app.on("error", (error) => {
        console.log(`MongoDB connection error:`, error)
    })

    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on PORT: ${process.env.PORT}`)
    })
})
    .catch((error) => {
        console.log("mongoDb connection failure", error)
    }) 