const express = require('express');

const router = express.Router();
const Question = require('../model/createQuestion.js')


// to create
router.post('/create', (req, res) => {
    const question = new Question(req.body);
    question.save((err, success) => {
        res.send(success)
    })
});

//to get all question
router.get("/questions",(rea,res)=>{
    Question.find((err,data)=>{
        if(err){
            res.status(400).json("there is no data");
        }

        res.json(data)
    })
})

router.param("question", (req, res, next, question) => {
    Question.find({question:question}).exec((err, question) => {
      // error checking
      if (err || !question) {
        return res.status(400).json({
          error: `Something went wrong in finding ${question}`,
        });
      }
      // return all the todos in json format
      req.question=question;
      // res.json(surveys);
      next();
    });
  });

  //to get single
router.get('/:question',(req,res)=>{
    res.json(req.question)
});

router.put("/:question/update",(req,res)=>{
    const prev=req.question[0];
    const {question,option1,option2,option3}=req.body;
    prev.question=question;
    prev.option1=option1;
    prev.option2=option2;
    prev.option3=option3
    prev.save((err, t) => {
        if (err || !t) {
          return res.status(400).json({
            error: "something went wrong while updating",
          });
        }
        // send the updated todo as a json response
        res.json(t);
      });
})






module.exports = router;