const expres = require("express")
const {userModel} = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
userRouter = expres.Router()

userRouter.post("/signup", async (req, res) => {
    try {
        // Destructure values from the request body
        const { email, password, name } = req.body;

        // Check if the email already exists
        const emailExists = await userModel.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password securely
        const hashedPassword = await bcrypt.hash(password, 8);

        // Create a new user with hashed password
        const newUser = new userModel({ email, password: hashedPassword, name });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        // Handle any errors that might occur
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});



userRouter.post("/login", async (req, res) => {
    try {
        // Destructure values from the request body
        const { email, password } = req.body;

        // Find the user by email
        const user = await userModel.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ error: "User email does not exist" });
        }

        // Check if the password is correct
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        // Create a JWT token for authentication
        const token = jwt.sign({ userid: user._id }, "yourSecretKey", { expiresIn: "2h" });

        // Send the token as a response
        res.json({ token });
    } catch (error) {
        // Handle any errors that might occur
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});




module.exports = {userRouter}