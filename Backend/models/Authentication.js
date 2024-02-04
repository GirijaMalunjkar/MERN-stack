const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,  // Keep this line, but consider not marking it as required
    }
});

// Exporting User model
const User = mongoose.model('User', UserSchema);

module.exports = {
    User
};
