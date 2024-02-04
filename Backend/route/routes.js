const express = require('express');
const router = express.Router();

// Import User model
const { User } = require('../models/Authentication');

router.get('/user', async (req, res) => {
    try {
        console.log(req.body);

        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
        });

        const result = await newUser.save();
        res.json({ msg: 'Added' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

// Add User
router.post('/user', async (req, res) => {
    try {
        console.log(req.body);

        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
        });

        const result = await newUser.save();
        res.json({ msg: 'Added' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

// Update user details
router.put('/update_user/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, email, password, confirmPassword } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = password;
        if (confirmPassword) user.confirmPassword = confirmPassword;

        const result = await user.save();
        res.json({ msg: 'Updated' });
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

// Delete user
router.delete('/delete_user/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const result = await User.findByIdAndDelete(userId);

        if (!result) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({ msg: 'Deleted' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

module.exports = router;
