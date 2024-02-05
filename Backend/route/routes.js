const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); 

// Import User model
const { User } = require('../models/Authentication');


// Add User
router.post('/user', async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        let newUser = new User({
            username,
            email,
            password,
            confirmPassword,
        });

        const result = await newUser.save();
        res.json({ msg: 'User added successfully' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

// Get user by ID
router.get('/get_user/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});


// Update User
router.put('/update_user/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, email, password, confirmPassword } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update fields if provided
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = password;
        if (confirmPassword) user.confirmPassword = confirmPassword;

        const result = await user.save();
        res.json({ msg: 'User updated successfully' });
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

        res.json({ msg: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

// Login User
router.post('/loginUser', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        // User not found
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        // Invalid password
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Login successful, return user data (you may want to send a token in a real scenario)
      res.json({ id: user._id, email: user.email });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
module.exports = router;
