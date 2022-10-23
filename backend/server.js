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

const Teachers = require("./models/teacher")
const Classes = require("./models/class")
const Types = require("./models/type")
const connect = require("./models")
connect()

async function run() {
    try {
        app.listen(port, ()=> {console.log( port + "connected")})
        app.get('/', (req, res) => { res.send("nodemon server.js on port" + port + "is now running") })
        app.get("/api/teacherget", (req, res) => {
            Teachers.find((error, result)=>{
                res.send(result)
            })
        })
        app.post("/api/teacherpost", async (req, res) => {
            var new_teacher = new Teachers(req.body)
            new_teacher.save((err) => {
                if (err) return res.status(500).json({message: "save failed"});
                else return response.status(200).json({message: "save success", data: new_item})
            })
        })
        app.post("/api/itempost", async (req, res) => {
            var new_type = new Types(req.body)
            new_type.save((err) => {
                if (err) return res.status(500).json({message: "teacher save failed"});
                else return response.status(200).json({message: "teacher save success", data: new_teacher})
            })
        })
        app.post("/api/classpost", async (req, res) => {
            var new_class = new Classes(req.body)
            new_class.save((err) => {
                if (err) return res.status(500).json({message: "teacher save failed"});
                else return response.status(200).json({message: "teacher save success", data: new_teacher})
            })
        })
    } finally {
        await console.log("done")
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
