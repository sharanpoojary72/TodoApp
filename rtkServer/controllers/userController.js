const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req,res) =>{
    const {username,email,password} = req.body;

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({username,email,password:hashedPassword});

        res.status(201).json({
            message:"User created Successfully",
            token:jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:'1h'})
        })
    } catch (err){
        res.status(400).json({message:err.message});
    }
}

exports.loginUser = async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))){
        res.json({token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }),
            // Optional: You can send user info too, but the 'token' key is required for authSlice
            user: { id: user._id, username: user.username } });
    } else {
        res.status(400).json({message:"Invalid credentials"});
    }
};