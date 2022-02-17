const { query } = require('express');
const { model, isValidObjectId } = require('mongoose');
const Reminder = require('../models/reminder.model');
// creating a new reminder async function taking req, res and next as callbacks to create a new reminder
exports.newReminder = async (req,res,next)=>{
    try {
        const {user, description, date } = req.body;
        if(user == null || description == null){
            return  res.status(400).json({
                message: "Pls fill all required field"
            })
        }
    const userExist = await Reminder.findOne({ user });
    if(userExist){
            return  res.status(406).json({
                message: "user already exists"
            })
    }
// creating an instance of the created model on the model file
        const addReminder = new Reminder ({user, description, date})
// using the save method to save the reminder in the database
        await addReminder.save();
        return res.status(201).json({
            success: true,
            addReminder
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
// creating an async function (taking req, res and next as callbacks) to find all reminders.
exports.findReminders = async (req,res,next) =>{
    try {
// finding all reminders and sorting them in order of their ids.
        allReminders = await Reminder.find({}, {"user":1,"_id": 1, "type": 1, "description": 1, "date": 1}).sort({_id: 1});
        return res.status(200).json({
            success: true,
            allReminders
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'error caught'
        })
    }
}
// creating a async function (taking req, res and next as callbacks) to find a single reminder.
exports.findOneReminder = async (req,res,next) =>{
    try {
// Destructuring the id as a request query and finding it by id
        const { _id } = req.query
        const oneReminder = await Reminder.findOne({_id: _id});
        if(oneReminder === null){
            return res.status(404).json({
                message: "ID not found",
            })
        }
        return res.status(200).json({
            success: true,
            oneReminder
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
// creating a async function (taking req, res and next as callbacks) to ensures reminders cannot be updated or modified.
exports.updateReminder = async (req,res,next)=>{
    try {
        return res.status(405).json({
            message: "Reminders cannot be updated"
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
// creating a async function (taking req, res and next as callbacks) to ensures reminders cannot be deleted.
exports.deleteReminder = async (req,res,next)=>{
    try {
    return res.status(405).json({
        message: "Reminders cannot be deleted"
    })
} catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message
    })
}
}