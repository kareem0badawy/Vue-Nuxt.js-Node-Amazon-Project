const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verify-token');



/*** SignUp Route ***/

router.post('/auth/signup', async(request, response)=> {
    if(!request.body.email || !request.body.password){
        response.json({
            success: false,
            message: "Plase enter email or password"
        });
    } else {
        try {
            let newUser = new User();
            newUser.name = request.body.name;
            newUser.email = request.body.email;
            newUser.password = request.body.password;
            await newUser.save();
            let token = jwt.sign(newUser.toJSON(), process.env.SECRET, {
                expiresIn: 604800 // 1 Week
            });
            response.json({
                success: true,
                message: "Successfuly created a new user",
                token: token,
            });
        } catch(err) {
            response.status(500).json({
                status : false,
                message: err.message
            });
        } 
    }
});

/* Profile Route */
router.get("/auth/user", verifyToken, async(request, response) => {
    try {
        let foundUser = await User.findOne({ _id: request.decoded._id }).populate('address');
        if(foundUser){
            response.json({
                success: true, 
                user: foundUser,
            });
        }
    } catch (err) {
        response.status(500).json({
            status : false,
            message: err.message
        });
    }
});


/* Profile Update */
router.put("/auth/user", verifyToken, async(request, response) => {
    try {
        let foundUser = await User.findOne({ _id: request.decoded._id });
        if(foundUser){
            if(request.body.name) foundUser.name  = request.body.name;
            if(request.body.email) foundUser.email  = request.body.email;
            if(request.body.password) foundUser.password  =  request.body.password;

            await foundUser.save();

            response.json({
                success: true,
                message: "Successfuly Update...!"
            });
        }
    } catch (err) {
        response.status(500).json({
            status : false,
            message: err.message
        });
    }
});


/* Login Route */

router.post("/auth/login", async(request, response) => {
    try {
        let foundUser = await User.findOne({ email: request.body.email });
        if(!foundUser){
            response.status(403).json({
                success: false,
                message: 'Authenticatication failed, User not found',
            })
        }else{
            if(foundUser.comparePassword(request.body.password)){
                let token = jwt.sign(foundUser.toJSON(), process.env.SECRET, {
                    expiresIn: 604800 // 1 Week
                })
                response.json({
                    success: true,
                    token: token,
                });
            }else{
                response.status(403).json({
                    success: false,
                    message: 'Authenticatication failed, Wrong password',
                })
            }
        }
    } catch (err) {
        response.status(500).json({
            status : false,
            message: err.message
        });
    }
});

module.exports = router;