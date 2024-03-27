const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
        const { email, password } = req.body;
    
        try {
            let user = await User.findOne({ email });
    
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const saltRounds = 5; 
            const hashedPassword = await bcrypt.hash(password, saltRounds);
    
            user = new User({ email, password: hashedPassword });
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Server Error' });
        }
    };
    
// Login 
const login = async (req, res) => {
        const { email, password } = req.body;
      
        try {
          let user = await User.findOne({ email });
      
          if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
          }
      
          const isMatch = await bcrypt.compare(password, user.password);
      
         //if (!isMatch) {
           // return res.status(400).json({ message: 'Invalid credentials' });
          //}
      
          const payload = { user: { id: user.id } };
          const token = jwt.sign(payload, "Supriya");
      
          res.status(200).json({ message:"login successfully",token });
        } catch (error) {
          console.error(error.message);
          res.status(500).json({ message: 'Server Error' });
        }
      };
      

module.exports = { signup, login };
