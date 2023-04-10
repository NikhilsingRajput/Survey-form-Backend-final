const mongoose=require('mongoose');
/*
work on it..
*/
const QuestionResponse=mongoose.Schema({
    question: String,
    answer: String
});

module.exports=mongoose.model("QuestionResponse" ,QuestionResponse);