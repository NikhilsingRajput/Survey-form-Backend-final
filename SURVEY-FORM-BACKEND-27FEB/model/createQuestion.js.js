const mongoose=require('mongoose');
/*
work on it..
*/
const Question=mongoose.Schema({
    question: String,
    options1:String,
    options2:String,
    options3:String
});

module.exports=mongoose.model("Question" ,Question);