const mongoose = require("mongoose")
const dbUri = "mongodb+srv://jm011jh:Tjdwoals92@jm011jh.2jkc7bg.mongodb.net/?retryWrites=true&w=majority";
const connect = () => {
    mongoose.connect(dbUri, (err) => {
            if (err) console.log("mongo db connect failed")
            else console.log("mongodb connect success")
    })
}

mongoose.connection.on('error', (err) => {
    console.error("mongo db connect error", err)
})
mongoose.connection.on('disconnected', ()=>{
    console.error("connection disconnected...retrying...")
    connect()
})

module.exports = connect;