const mongoose=require('mongoose');


const Survey=mongoose.Schema({
    email: String,
    name: String,
    description: String,
    type: String,
    startDate: String,
    endDate: String,
    otherCriteria: String,
    image: String,
    Survey:[{
        String
    }]
});

module.exports=mongoose.model("Survey" ,Survey);