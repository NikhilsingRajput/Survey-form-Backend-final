const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const Authenticate = require('../Middleware/authenticate');



/* New User Registration and password hashing */

router.post('/', async (req, res) => {
    const { name, email, phone, profession, password, confirmPassword } = req.body
    // Check if email already exists 
    let existinguser;
    try {
        existinguser = await User.findOne({ email: email })
    } catch (error) {
        console.log(error)
    }
    if (existinguser) {
        return res.status(400).json({ Message: 'email already exists' })
    }
    // Hashing
    const hashedpassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        phone,
        profession,
        password: hashedpassword,
        time: new Date()
    });
    try {
        await user.save();
        return res.status(201).json({ Success: user })

    } catch (error) {
        console.log(error)
    }

});

// Authentication and Sign in 
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ error: "plz Filled th data " })
        }

        const userlogin = await User.findOne({ email: email });

        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            if (!isMatch) {
                return res.status(400).json({ error: "Invalid Credientials" })
            } else {
                // const token = jwt.sign({ id: userlogin._id }, jwt_secret_key, {
                //     expiresIn: "7d"
                // })
                const token = await userlogin.generateAuthToken(); // see user.js in model
                console.log(token)
                
                    res.cookie('jwtoken', token, {
                    // path: '/',
                    expires: new Date(Date.now() + 10000000), //10 min
                    httpOnly: true,
                    // sameSite: "lax"
                })
                return res.status(200).json({ message: "Sign in Success", user: userlogin, token })
            }
        }
        return res.status(400).json({ error: "Invalid Credientials" })


    } catch (error) {
        console.log(error)
    }
})
// jwt token validation
// const verifytoken = (req, res, next) => {
//     const cookie = req.headers.cookie;
//     const token = cookie.split("=")[1];
//     console.log(token)
                               // const headers = req.headers['authorization'];
                                // console.log(headers)  token generated
                                 // const token = headers.split(" ")[1];
//     if (!token) {
//         res.status(400).json({ message: "No token found" })
//     }
//     jwt.verify(String(token), jwt_secret_key, (err, user) => {
//         if (err) {
//             return res.status(400).json({ message: "Invalid Token" })
//         }
//         req.id = user.id;
//     })
//     next()
// }

const getUser = async (req, res, next) => {
    const userId = req.id;
    let user;
    try {
        user = await User.findById(userId, "-password")
    } catch (err) {
        console.log(err)
    }
    if (!user) {
        return res.status(400).json({ message: "User Not Found" })
    }
    return res.status(200).json({ User_data: user })
}

// router.get('/user', verifytoken, getUser);

router.get('/user', Authenticate, (req,res)=>{
    res.send(req.rootUser)
})

router.get('/logout',(req,res)=>{
    console.log("logout")
    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).send("logout success")
})

module.exports = router;

