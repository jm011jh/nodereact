const mongoose = require("mongoose");

var TypeSchema = new mongoose.Schema({
    subject_name : { type: String, required: true },
    subject_index : { type: Number, required: true },
},{collection : 'subject'})

module.exports = mongoose.model("subject",TypeSchema)