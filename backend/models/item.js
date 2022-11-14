const mongoose = require("mongoose");

var ItemSchema = new mongoose.Schema({
    item_id :   { type: Number, required: true },
    item_type :   { type: Number, required: true },
    item_title :  { type: String, required: true },
    item_subject :  { type: Number, required: true },
    item_date :   { type: String, required: true },
    item_time :   { type: String, required: true },
    item_teacher_id :{ type: Number, required: true },
    item_count_student : {type: Number},
},{collection: 'item'})

module.exports = mongoose.model('item', ItemSchema)