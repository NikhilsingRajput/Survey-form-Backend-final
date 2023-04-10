const mongoose=require('mongoose');

/*
after authorization user should be able to access this db cluster to fetch all his listed survey
*/
const Survey=mongoose.Schema({
    name: String,
    description: String,
    type: String,
    startDate: String,
    endDate: String,
    otherCriteria: String,
    image: File
});

module.exports=mongoose.model("Survey" ,Survey);