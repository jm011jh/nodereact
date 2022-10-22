const mongoose = require("mongoose");

var ItemSchema = new mongoose.Schema({
    item_type :   { type: Number, required: true },
    item_title :  { type: String, required: true },
    item_class :  { type: Number, required: true },
    item_date :   { type: Number, required: true },
    item_time :   { type: Number, required: true },
    item_teacher_id :{ type: Number, required: true },
    item_count_student : {type: Number},
})

module.exports = mongoose.model('class', ItemSchema)