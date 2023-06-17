const jwt = require("jsonwebtoken");
const User = require('../model/user');

const Authenticate = async(req , res , next)=>{
    console.log("hhhh")
try {
    const token = req.cookies.jwtoken;
    
    const verifyToken = jwt.verify(token ,'DFLKVNDUFHBDFNMFDKJVHIURDVBNDFMBVFDBB');
    
    const rootUser = await User.findOne({_id: verifyToken._id });
    console.log(rootUser)
    if(!rootUser){
        // throw new Error('User Not Found')
        console.log("no user found")
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();

} catch (error) {
    
    res.status(401).send('NO Token Provided' );
    
}
}
module.exports = Authenticate