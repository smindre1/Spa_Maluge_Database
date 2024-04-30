const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

module.exports = {
  //get all users/staff
  async users(req, res) {
    await User.find()
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
        req.params.phone ? user = await User.findOne({ phone: req.params.phone }) : user = await User.findOne({ email: req.params.email });
  
        if (!user) {
            //throw AuthenticationError;
            console.log('User Not Found!');
            return res.status(404).json({ error: AuthenticationError });
        }
  
        const correctPw = await user.isCorrectPassword(req.params.password);
  
        if (!correctPw) {
            console("Incorrect Password");
            //   throw AuthenticationError;
            console.log('Incorrect Password!');
            return res.status(404).json({ error: 'Incorrect Password' });
        }
  
        const token = signToken(user);
        // return { token, user };

      // Send the monthData as a JSON response to the client
      res.status(200).json({ token, data: user });
    } catch (error) {
      console.error('Error, failed to log in', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  async me(req, res) {
    try {
        const user = User.findOne({ _id: req.params.userId });

        res.status(200).json({ message: 'Found User Profile', data: user });
    } catch (error) {
      console.error("Error, could not find user's profile", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async updateUser(req, res) {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body );
        res.status(200).json({ message: 'User updated', data: user });
    } catch (error) {
      console.error('Error updating user', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async deleteUser(req, res) {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        res.status(200).json({ message: 'User deleted', data: user });
    } catch (error) {
      console.error('Error deleting user', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};