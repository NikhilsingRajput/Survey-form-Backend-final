const express = require('express');
const router = express.Router();
const UserSurvey = require('../model/userSurvey');


// to create survey
router.post('/create', async (req, res) => {
    const survey = new UserSurvey(req.body);
    // console.log(survey)
   await survey.save((err, success) => {
        res.send({ success })
    })
});


//to read all surveys to render on login
router.get('/surveys',  (req, res) => {
    UserSurvey.find().sort("-createdAt")
    .exec((err, surveys) => {
      // error checking
      if (err || !surveys) {
        return res.status(400).json({
          error: "Something went wrong in finding all surveys",
        });
      }
      res.json(surveys);
    });
});

router.delete('/surveys/:name/delete',(req,res)=>{
  let id=req.body.id;
  console.log("delete called");
  res.status(200)
  UserSurvey.findByIdAndRemove({_id:id})
    .then(()=>{
      res.json({
        message: "survey deleted successfully!"
      })
    })
    .catch(err =>{
      res.json({error : "Error while deleting surveys"})
    })
  })
//a user can only update survey name,description and other crietria
router.patch('/surveys/:name/update',(req,res)=>{
  let id = req.body.id
  const newdata={
  name:req.body.name,
  description : req.body.description,
  otherCriteria : req.body.otherCriteria
  }
  UserSurvey.findByIdAndUpdate(id , newdata)
  .then(()=>{
    res.json({
      success : "survey details updated successfully"
    })
  })
  .catch(()=>{
    res.json({
      error: "something went wrong while updating"
    })
  })
  });

module.exports = router;