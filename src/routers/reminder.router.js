const sample = require('../controllers/reminder.controller');
const express = require("express");
const reminderRoute = express.Router();

reminderRoute.post("/add-reminder", sample.newReminder);
reminderRoute.get("/find-a-reminder", sample.findOneReminder);
reminderRoute.get("/find-reminders", sample.findReminders);
reminderRoute.patch("/update-reminder", sample.updateReminder);
reminderRoute.delete("/delete-reminder", sample.deleteReminder);
// exporting all routes
module.exports = reminderRoute;