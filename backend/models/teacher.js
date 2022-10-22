const mongoose = require("mongoose");

var TeacherSchema = new mongoose.Schema({
    teach_id : { type: Number, required: true },
    teach_name : { type: String, required: true },
    teach_school : {type: Number, required: true },
    teach_history : {type: Array}
})

module.exports = mongoose.model("Teacher",TeacherSchema)