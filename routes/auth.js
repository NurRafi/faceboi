// All authentication functions are here.

const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt"); // Encrypt the user passwords before store to MongoDB. bcrypt is asynchronous.

// Register a user

/*
router.post("/register", async (req, res) => {
    // A new instance of a model is called a document
    // The process below is an async function, that is why we need to write async above
    // And, await below because we wait for the function to complete.
    const user = await new User({
        username: "nur",
        email: "nurrafi@protonmail.com",
        password: "123456"
    });

    await user.save(); // Writing in the database (async)
    res.send("User created.");
});
*/

// Set a user as a request (req), testing using Postman
// Inside Postman, create a new collection and then a new request.
// Inside new request, select Body, then raw (JSON)
router.post("/register", async (req, res) => {
    try {
        // Generate new encrypted password.
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user.
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        // Save user and respond.
        const user = await newUser.save();
        res.status(200).json(user); // User created successfully.
    } catch (error) {
        res.status(500).json(error); // Internal Server Error
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email}); // findOne() because there is only one document with one email
        !user && res.status(404).json("User not found.");

        // We must validate input because what if only email is sent but not password?
        // The below function is await, so it will never resolve
        // Note: Can an alternative option be a timeout?
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(401).json("Invalid password."); // 401 status code means Unauthorized

        res.status(200).json(user);
    } catch (error) {
        // Note: Implement custom error handling later.
        res.status(500).json(error); // Internal Server Error
    }
});

module.exports = router;