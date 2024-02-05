const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique
        match: /^\S+@\S+\.\S+$/ // Basic email format validation
    },
    password: {
        type: String,
        required: true
    },
});

// Hash the password before saving to the database
UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Exporting User model
const User = mongoose.model('User', UserSchema);

module.exports = {
    User
};
