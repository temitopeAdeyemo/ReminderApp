const query = require("express/lib/middleware/query");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// creating a reminder schema 
const reminderSchema = new Schema({
    user: {
        "type": String,
        required: [true, "pls input user"]
    },
    description: {
        "type": String,
        required: [true, "pls input description"]
    },
    date: {
        "type": Date,
        default: Date.now,
        immutable: true
    },
},
{
    timestamps: true
});
// creating a reminder model for the schema
const reminderModel = mongoose.model("Reminder", reminderSchema);
// exporting the reminder model to be used in other files when required
module.exports = reminderModel;