const User = require('../models/user');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
    try {
        const {username, email , password} = req.body;
        let user = await User.findOne({email});
        if(user) {
            res.status(500).json({message: 'User already exists'})
        }

        user = new User({username, email, password});
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound);
        await user.save()
        res.status(200).json({
            message: 'User was successfully created', 
            token: await user.generateToken(),
            userId: user._id.toString(),
        });

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const login = async(req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if(!user) {
            return res.status(401).json({message: 'Invalid username or password'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        // const isMatch = await user.comparePassword(password);
        if(isMatch) {
            res.status(200).json({
                message: 'User was successfully logged in', 
                token: await user.generateToken(),
                userId: user._id.toString(),
            });
        } else {
            res.status(401).json({message: 'Invalid credentials'});
        }
    } catch (error) {
        res.status(401).json({message: error.message});
    }
}

module.exports = {signup, login}