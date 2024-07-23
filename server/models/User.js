const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//HASHING PASSWORD
UserSchema.pre('save', async function(next) {
    const user = this;
    if(!user.isModified('password')) {
        next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
})

//JSONWEBTKEN
UserSchema.methods.generateToken = async function() {
    try {
        return JWT.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.IsAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '7d',
        }
    )
    } catch (error) {
        console.error(error);
    }
}

// UserSchema.methods.comparePassword = async function(password) {
//     return bcrypt.compare(password, this.password)
// }

const User = mongoose.model('User', UserSchema);

module.exports = User;