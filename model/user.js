const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')
/*
this model is for storing the user profile details when one tryes to registrer
such as name,password,

when someonr tries to login we shall compare his credentials with the db and will authorise the user

*/

const User=mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    profession : String,
    password: String,
    confirmPassword:String

})


User.pre( 'save' , async function (next) {
    
    this.password = await bcrypt.hash(this.password,6)
    this.confirmPassword = await bcrypt.hash(this.confirmPassword,6)
    
    next();
});

module.exports=mongoose.model('User',User);