const router = require('express').Router();
const User = require('../models/User');
const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');
// const bcrypt = require('bcryptjs/dist/bcrypt');


router.post('/signup',async (req,res)=>{
    const { name , email ,password } = req.body;
    try{
        bcrypt.genSalt(12,(err,salt)=>{
            bcrypt.hash(password,salt,async (err,hash)=>{
                let user=await User.findOne({email:email})
                if(user){
                    return res.status(400).json({err:"Email already registered"});
                }
                user = new User({
                    name : name,
                    email : email,
                    password : hash
                })
                console.log(user);
                user.save().then(data=>{
                    console.log(data);
                    return res.status(200).json({msg:"User Registered Successfully"})
;                })
            })
        })

    }catch(err){
        console.log(err);
    }
})

router.post('/login',async (req,res)=>{
    const { email ,password } = req.body;
    try{
        let user=await User.findOne({email:email})
        if(!user){
            return res.status(400).json({err:"Email not registered"});
        }
        const match=await bcrypt.compare(password,user.password)
        if(!match) return res.json({err:"Password not match"}).status(401);
            const token = jwt.sign(
                { id: user._id, email },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "1h",
                }
              );
                user.token=token
                return res.json({data:user}).status(200);
    }catch(err){
        console.log(err);
    }
})

module.exports= router