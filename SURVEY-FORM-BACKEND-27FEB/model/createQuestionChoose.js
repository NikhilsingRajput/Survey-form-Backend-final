const mongoose=require('mongoose');

const Choice=mongoose.Schema({
    question:String,
    true:String,
    false:String
})

module.exports=Choice;