const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const app = express();
app.use(bodyParser.json())
app.use(methodOverride("_method"));
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors());


const port = 5000;
const saltRounds = 10;
const { Collection } = require("mongodb-legacy");
const { response } = require("express");
const dbUri = "mongodb+srv://jm011jh:Tjdwoals92@jm011jh.2jkc7bg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(dbUri);
const Teachers = require("./models/teacher")
const Items = require("./models/item")
const Types = require("./models/type")
const connect = require("./models")
connect()

const db = client.db("study")
const itemColl = db.collection("item")
const teacherColl = db.collection("teacher")
const typeColl = db.collection("type")

const newType = new Types({
    "type_index" : 123,
    "type_name" : "settttt-type"
})
newType.save(function(err,data){
    if(err){console.log(err)}
    else{console.log("saved")}
})
async function run() {
    try {
        // app.get("/api/check", (req, res) => {res.send("success!!")})
        app.listen(port, ()=> {console.log( port + "connected")})
        app.get('/', (req, res) => { res.send("hi") })
        app.get("/api/check", (req, res) => {
            // res.send(types)
            Types.find()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {console.log(err)})
        })
        app.post("/api/itempost", async (req, res) => {
            var new_item = new Items(req.body)
            new_item.save((err) => {
                if (err) return res.status(500).json({message: "save failed"});
                else return response.status(200).json({message: "save success", data: new_item})
            })
        })
        app.post("/api/teacherpost", async (req, res) => {
            var new_teacher = new Teachers(req.body)
            new_teacher.save((err) => {
                if (err) return res.status(500).json({message: "teacher save failed"});
                else return response.status(200).json({message: "teacher save success", data: new_teacher})
            })
        })
    } finally {
        await client.close()
    }
}
run().catch(console.dir)
// MongoClient.connect(dbUri, (err, client) => {
//   if (err) return console.log(err);
//   app.listen(port, () => {
//     console.log("listening on" + port);
//   });
// });

// app.use(express.static(path.join(__dirname, 'nodewithreact/build')))
// app.get('/', ( req, res ) => {
//     res.sendFile(path.join(__dirname, 'nodewithreact/build/index.html'))
// })
// app.get("*", ( req, res ) => {
//     res.sendFile(path.join(__dirname, 'nodewithreact/build/index.html'))
// })
