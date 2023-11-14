const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");

const signup = async (req, res) => {
    try {
        const findUser = await User.findOne({ email: req.body.password });
        if (findUser) {
            return res.status(404).json({ message: "User already Exist." });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 13);
        const newUser = await User.create({ name: req.body.name, email: req.body.email, password: hashedPassword });
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
        const { password, ...others } = newUser._doc;
        res.status(200).json({ ...others, token });
    } catch (err) {
        res.status(500).json("Something went wrong");
    }
};

const login = async (req, res) => {
    try {
        const findUser = await User.findOne({ email: req.body.email })
        if(!findUser){
          return res.status(404).json({ message: "User not found." });
        }
        const isPasswordMatched = await bcrypt.compare(req.body.password,findUser.password)
        if(!isPasswordMatched){
          return res.status(404).json({message:"Invalid Password"})
        }
        const token = jwt.sign({ email: findUser.email, id: findUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const { password, ...others } = findUser._doc;
        res.status(200).json({ ...others, token });
    } catch (err) {
        res.status(500).json("Something went wrong");
    }
};

module.exports = { signup, login };
