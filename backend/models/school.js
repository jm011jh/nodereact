const mongoose = require("mongoose");

var SchoolSchema = new mongoose.Schema({
    school_id : { type: Number, required: true },
    school_name : { type: String, required: true },
},{collection: 'school'})

module.exports = mongoose.model("School",SchoolSchema)