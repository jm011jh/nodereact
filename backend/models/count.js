const mongoose = require("mongoose");

var CountSchema = new mongoose.Schema({
    count_name : { type: String, required: true },
    count_num : { type: Number, required: true },
},{collection: 'count'})

module.exports = mongoose.model("Count",CountSchema)