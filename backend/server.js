const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
// const AutoIncrementFactory = require("mongoose-sequence")
// const AutoIncrement = AutoIncrementFactory(mongoose)
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
const Items = require("./models/item")
const Types = require("./models/type")
const Count = require("./models/count")
const Schools = require("./models/school")
const Subjects = require("./models/subject")
const connect = require("./models")
connect()

async function run() {
    try {
        app.listen(port, ()=> {console.log( port + "connected")})
        app.get('/', (req, res) => { res.send("nodemon server.js on port" + port + "is now running") })
        //#region api get
        app.get("/api/getcount", (req, res) => {
            Count.find((error, result) => {
                if(error) console.log(error)
                res.send(result)
            })
        })
        app.get("/api/getsubject", (req, res) => {
            Subjects.find((error, result) => {
                if(error) console.log(error)
                res.send(result)
            })
        })
        app.get("/api/getschool", (req, res) => {
            Schools.find((error, result) => {
                if(error) console.log(error)
                res.send(result)
            })
        })
        app.get("/api/getteacher", (req, res) => {
            Teachers.find((error, result) => {
                if(error) console.log(error)
                res.send(result)
            })
        })
        app.get("/api/getitem", (req, res) => {
            Items.find((error, result) => {
                if(error) console.log(error)
                res.send(result)
            })
        })
        app.get("/api/gettype", (req, res) => {
            Types.find((error, result) => {
                if(error) console.log(error)
                res.send(result)
            })
        })
        //#endregion api get
        //#region api post
        app.post("/api/teacherpost", async (req, res) => {
            var new_teacher = new Teachers(req.body)
            new_teacher.save((err) => {
                if(err) console.log(err)
            })
            Count.findOne({count_name : "teacher"},(err, res) => {
                if (err) console.log(err)
                let increaseOne = res.count_num + 1
                Count.updateOne({count_name : "teacher"}, {count_num : increaseOne}, (error) => {
                    if (error) console.log(error)
                })
            })
        })
        app.post("/api/typepost", async (req, res) => {
            var new_type = new Types(req.body)
            new_type.save((err) => {
                if (err) return res.status(500).json({message: "type save failed"});
                else return response.status(200).json({message: "type save success", data: new_type})
            })
            Count.findOne({count_name : "type"},(err, res) => {
                if (err) console.log(err)
                let increaseOne = res.count_num + 1
                Count.updateOne({count_name : "type"}, {count_num : increaseOne}, (error) => {
                    if (error) console.log(error)
                })
            })
        })
        app.post("/api/classpost", async (req, res) => {
            var new_class = new Classes(req.body)
            new_class.save((err) => {
                if (err) return res.status(500).json({message: "class save failed"});
                else return response.status(200).json({message: "class save success", data: new_class})
            })
            Count.findOne({count_name : "class"},(err, res) => {
                if (err) console.log(err)
                let increaseOne = res.count_num + 1
                Count.updateOne({count_name : "class"}, {count_num : increaseOne}, (error) => {
                    if (error) console.log(error)
                })
            })
        })
        app.post("/api/schoolpost", async (req, res) => {
            var new_schools = new Schools(req.body)
            new_schools.save((err) => {
                if (err) return res.status(500).json({message: "school save failed"});
                else return response.status(200).json({message: "school save success", data: new_schools})
            })
            Count.findOne({count_name : "school"},(err, res) => {
                if (err) console.log(err)
                let increaseOne = res.count_num + 1
                Count.updateOne({count_name : "school"}, {count_num : increaseOne}, (error) => {
                    if (error) console.log(error)
                })
            })
        })
        app.post("/api/itempost", async (req, res) => {
            var new_items = new Items(req.body)
            new_items.save((err) => {
                if (err) return res.status(500).json({message: "item save failed"});
                else return res.status(200).json({message: "item save success", data: new_items})
            })
            Count.findOne({count_name : "item"},(err, res) => {
                if (err) console.log(err)
                let increaseOne = res.count_num + 1
                Count.updateOne({count_name : "item"}, {count_num : increaseOne}, (error) => {
                    if (error) console.log(error)
                })
            })
        })
        //#endregion api post
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
