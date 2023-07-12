const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const registrationRouter=require('./route/route');
const surveyRouter=require("./route/surveyRoute");
const questionRouter=require('./route/questionRoute');
const cookieparser = require('cookie-parser');
dotenv.config({path:'./config.env'})

const app = express();
const uri = process.env.MONGOURL

mongoose.set('strictQuery',false);
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
       
    })
    .then(() => {
        console.log("CONNECTED TO DATABASE");
    });

app.use(cookieparser())
app.use(cors({credentials:true , origin:'*'}));
// app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use('/',registrationRouter);
app.use('/survey',surveyRouter);
app.use('/survey/question',questionRouter);


const port = 8000;


app.listen(port, () => {
    console.log(`server is live on port ${port}`)
});
