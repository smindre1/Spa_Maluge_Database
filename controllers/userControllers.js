const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const bcrypt = require('bcrypt');

module.exports = {
  //get all users/staff
  async users(req, res) {
    await User.find().select('-password').lean()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));;
  },
  async addUser(req, res) {
    try {
        const { fullName, email, phone, password, position } = req.body;
        const user = await User.create({ fullName, email, phone, password, position });
        const token = signToken(user);
      //Checking Response
        res.status(201).json({ message: 'User and Auth Token added successfully', token, data: user });
    } catch (error) {
        console.error('Error adding user and making authentication token', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  },
  async login(req, res) {
    try {
        var user;
        //It will check if a phone number is provided, if not it will search based on the email input.
        req.body.phone ? user = await User.findOne({ phone: req.body.phone }) : user = await User.findOne({ email: req.body.email });
  
        if (!user) {
            //throw AuthenticationError;
            console.log('User Not Found!');
            return res.status(404).json({ error: AuthenticationError });
        }
  
        const correctPw = await user.isCorrectPassword(req.body.password);
  
        if (!correctPw) {
            //   throw AuthenticationError;
            console.log('Incorrect Password!');
            return res.status(404).json({ error: 'Incorrect Password' });
        }
  
        const token = signToken(user);

        //Retrieves the user's data again but this time without the password field
        req.body.phone ? await User.findOne({ phone: req.body.phone }).select('-password').exec().then(profile => {
          if (profile) {
            // Process the user object without the 'password' field
            user = profile;
          } else {
            console.log('User not found');
            // Handle case where user is not found
            return res.status(404).json({ message: "User not found. Code 410", error: AuthenticationError });
          }
        })
           : await User.findOne({ email: req.body.email }).select('-password').exec().then(profile => {
            if (profile) {
              // Process the user object without the 'password' field
              user = profile;
            } else {
              console.log('User not found');
              // Handle case where user is not found
              return res.status(404).json({ message: "User not found. Code 411", error: AuthenticationError });
            }
          });

        // Send the token and user data as a response
        res.status(200).json({ token, data: user });
    } catch (error) {
      console.error('Error, failed to log in', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  async me(req, res) {
    try {
        const user = await User.findOne({ _id: req.params.userId }).select('-password').lean();
        if(!user) {
          return res.status(404).json({ error: 'Could not find user' });
        }
        res.status(200).json({ message: 'Found User Profile', data: user });
    } catch (error) {
      console.error("Error, could not find user's profile", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async updateUser(req, res) {
    try {
        if(req.body.password) {
          const saltRounds = 10;
          req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        }
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, {new: true} );
        res.status(200).json({ message: 'User updated' });
    } catch (error) {
      console.error('Error updating user', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async deleteUser(req, res) {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        res.status(200).json({ message: `User ${user.name} deleted`});
    } catch (error) {
      console.error('Error deleting user', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};