const mongoose = require("mongoose");

var TypeSchema = new mongoose.Schema({
    type_index : { type: Number, required: true },
    type_name : { type: String, required: true },
},{collection : 'type'})

module.exports = mongoose.model("type",TypeSchema)